package mn.icode.service;

import org.springframework.stereotype.Service;

import mn.icode.repository.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    
}
