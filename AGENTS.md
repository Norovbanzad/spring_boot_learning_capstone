# AGENTS.md

Spring Boot capstone app (`spring_boot_learning_capstone`) for iCode. Single Maven module, base package `mn.icode`.

## Toolchain quirks

- **Spring Boot 4.1.1 / Java 25** (parent POM + `java.version=25`). This is Spring Boot 4.x, which split the classic starters into modular ones — this project already uses the new names. When adding dependencies, use the modular artifacts used here:
  - `spring-boot-starter-webmvc` (NOT the removed `spring-boot-starter-web`)
  - test starters `spring-boot-starter-webmvc-test`, `spring-boot-starter-data-jpa-test`, `spring-boot-starter-thymeleaf-test` (NOT `spring-boot-starter-test`)
  - `spring-boot-starter-data-jpa`, `spring-boot-starter-validation`, `spring-boot-devtools` (runtime), `spring-boot-starter-thymeleaf`
- Build/run with the wrapper: `./mvnw spring-boot:run`. No CI, no lint/format config in the repo.

## Running / testing

- **PostgreSQL is required** for the app and even for tests: `@SpringBootTest` boots the full context, so `./mvnw test` connects to the datasource. Credentials are hardcoded in `src/main/resources/application.properties`: `jdbc:postgresql://localhost:5432/learning`, user/pass `postgres`/`postgres`.
- `spring.jpa.hibernate.ddl-auto=update` — there are **no migration files**; Hibernate owns the schema from the entities. Changing an entity mutates the dev DB automatically; dropping columns will not remove data.
- `spring.jpa.open-in-view=false`; `spring.thymeleaf.cache=false` (devtools + Thymeleaf are on the classpath even though controllers are REST/JSON).

## Architecture & conventions

- Strict per-feature layering under `mn.icode`: `controller/` (REST, `@RestController`, route prefix `/api/<resource>`) → `service/` (`@Service`) → `repository/` (Spring Data JPA interfaces) + `model/` (entities) + `dto/`. Features so far: `User`, `Category`, `Course`, `Lesson`. Main class is `mn.icode.SpringBootLearningCapstoneApplication`.
- **No Lombok.** Entities use a public no-arg constructor plus hand-written getters/setters (`boolean` uses `isPublished()` style). Match this.
- Entities: `@Table` names are plural snake_case (`courses`, `categories`, `lessons`); `@Id` is `IDENTITY Long`; `created_at` set via `@CreationTimestamp` on an `Instant` with `updatable=false`.
- **DTOs are Java records** (e.g. `CourseCreateRequest` with `Long category_id`; responses like `CourseResponse`). Not all GET endpoints use them: several return raw JPA entities (e.g. `CourseController.findAll()` returns `List<Course>`). When extending a feature, match what its controller/service already returns.
- Constructor injection everywhere (`final` fields). Services `.orElseThrow()` on missing entities rather than returning `null` or custom exceptions.
- `config/PasswordConfig` exposes a `BCryptPasswordEncoder` bean from `spring-security-crypto`. There is **no full Spring Security** — no filter chain/security starter, so nothing is secured at the HTTP layer; just reuse the `PasswordEncoder` bean where passwords are involved.

## Working style

- `spring.jpa.show-sql=false` — if you need SQL logging to debug, flip it on locally rather than committing it.
- API routes are `/api/<resource>` (e.g. `/api/courses`, `/api/lessons`), server on port 8080.
