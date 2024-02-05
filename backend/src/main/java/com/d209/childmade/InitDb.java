package com.d209.childmade;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import com.d209.childmade.role.entity.Role;
import com.d209.childmade.role.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitDb {

    private  final InitService initService;

    @PostConstruct
    @Transactional
    public void init() {
        initService.dbinit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final BookRepository bookRepository;
        private final MemberRepository memberRepository;
        private final RoleRepository roleRepository;

        public void dbinit() {

            // 초기 Member 데이터 추가
            Member member1 = Member.of("socialId", ProviderType.GOOGLE, "example@example.com", "John Doe", "johnny", "profile.jpg");
            Member member2 = Member.of("socialIdddd", ProviderType.GOOGLE, "example22@example.com", "John Doe", "johnny", "profile.jpg");
            memberRepository.save(member1);
            memberRepository.save(member2);

            // 테스트용 Book 데이터 추가
            Book book = Book.of("Book Title", "book_image_url", "Book Summary", 10);
            bookRepository.save(book);
            // 테스트용 Role 데이터 추가
            Role role1 = Role.of("Role 1", "role1_image_url", book);
            Role role2 = Role.of("Role 2", "role2_image_url", book);
            Role role3 = Role.of("Role 3", "role3_image_url", book);
            Role role4 = Role.of("Role 4", "role4_image_url", book);

            roleRepository.saveAll(List.of(role1, role2,role3,role4));

        }
    }
}
