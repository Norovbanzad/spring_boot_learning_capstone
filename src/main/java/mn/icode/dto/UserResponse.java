package mn.icode.dto;

import mn.icode.model.Role;

public record UserResponse(
            
        Long id,
        String firstName,
        String lastName,
        String email,
        Role role,
        boolean enalbled
        )    { }
