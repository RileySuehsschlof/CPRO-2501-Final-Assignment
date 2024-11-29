package com.example.demo;

import com.example.demo.entity.Account;
import com.example.demo.repository.IAccountRepository;
import com.example.demo.service.AccountService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;


//Testing wit JUnit for the backend (Java class)
@ExtendWith(MockitoExtension.class)
public class EmailExistsTest {
    @Mock
    private IAccountRepository accountRepository;
    @InjectMocks
    private AccountService accountService;

    @Test
    void testEmailExists(){
        Account mockAccount = new Account();
        mockAccount.setEmail("smith@email.com");
        //mock repository
        when(accountRepository.findByEmailTest("smith@email.com")).thenReturn((Optional.of(mockAccount)));
        Optional<Account> emailExists = accountService.getAccountByEmailTest("smith@email.com");
        System.out.println(emailExists);

        assertTrue(emailExists.isPresent(), "The email should exist");
    }
}
