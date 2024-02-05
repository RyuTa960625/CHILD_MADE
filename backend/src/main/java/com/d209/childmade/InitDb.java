package com.d209.childmade;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.entity.Script;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.book.repository.ScriptRepository;
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
        private final ScriptRepository scriptRepository;

        public void dbinit() {

            // 초기 Member 데이터 추가
            Member member = Member.of("socialId", ProviderType.GOOGLE, "example@example.com", "John Doe", "johnny", "profile.jpg");
            memberRepository.save(member);

            // 테스트용 Book 데이터 추가
            Book book1 = Book.of("Book Title", "book_image_url", "Book Summary", 10);
            Book book2 = Book.of("Book Title 2", "book_image_url_2", "Book Summary 2", 20);
            Book book3 = Book.of("Book Title 3", "book_image_url_3", "Book Summary 3", 30);

            bookRepository.saveAll(List.of(book1,book2,book3));

            // 테스트용 Role 데이터 추가
            Role role1 = Role.of("Role 1", "role1_image_url", book1);
            Role role2 = Role.of("Role 2", "role2_image_url", book1);
            Role role3 = Role.of("Role 3", "role3_image_url", book2);
            Role role4 = Role.of("Role 4", "role4_image_url", book2);
            Role role5 = Role.of("Role 5", "role5_image_url", book3);
            Role role6 = Role.of("Role 6", "role6_image_url", book3);
            roleRepository.saveAll(List.of(role1, role2,role3,role4,role5,role6));

            // 테스트용 Script 데이터 추가
            Script script1 = Script.of(1, "Script Line", "video_url", 1, role1, book1);
            Script script2 = Script.of(2, "Script Line", "video_url", 1, role1, book1);
            Script script3 = Script.of(3, "Script Line", "video_url", 1, role1, book1);
            Script script4 = Script.of(4, "Script Line", "video_url", 2, role1, book1);
            Script script5 = Script.of(5, "Script Line", "video_url", 2, role1, book1);
            Script script6 = Script.of(6, "Script Line", "video_url", 2, role1, book1);
            scriptRepository.saveAll(List.of(script1,script2,script3,script4,script5,script6));

        }
    }
}
