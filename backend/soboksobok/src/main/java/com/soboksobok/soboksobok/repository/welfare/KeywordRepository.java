package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.Keyword;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class KeywordRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Keyword> findAllKeyword() {
        return em.createQuery("select k from Keyword k", Keyword.class)
                .getResultList();
    }
}
