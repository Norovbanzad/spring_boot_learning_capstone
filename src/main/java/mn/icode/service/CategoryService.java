package mn.icode.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mn.icode.model.Category;
import mn.icode.repository.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category findCategoryById(Long id) {
        return  categoryRepository.findById(id).orElseThrow();
    }
    
    @Transactional
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category newCategory) {
        Category foundCategory = categoryRepository.findById(id).orElseThrow();
        foundCategory.setCategoryName(newCategory.getCategoryName());
        return categoryRepository.save(foundCategory);
    }

    public void deleteCategory(Long id) {
        Category foundCategory = categoryRepository.findById(id).orElseThrow();
        categoryRepository.delete(foundCategory);
    }
    

    

    
}
