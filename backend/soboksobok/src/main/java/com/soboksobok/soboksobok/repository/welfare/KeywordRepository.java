package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.Keyword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class KeywordRepository {

    private final EntityManager em;

    public void save(Keyword keyword) {
        em.persist(keyword);
    }

    public List<Keyword> findAllKeyword() {
        return em.createQuery("select k from Keyword k", Keyword.class)
                .getResultList();
    }

    public List<Keyword> getPopular() {
        return em.createQuery("select k from Keyword k order by k.keywordCnt DESC", Keyword.class)
                .getResultList();
    }
}
