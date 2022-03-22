package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class WelfareRepository {

    @PersistenceContext
    private EntityManager em;

    public Welfare findByWelfareId(Long id) {
        return em.find(Welfare.class, id);
    }

    public List<Welfare> findAllWelfare() {
        return em.createQuery("select w from Welfare w", Welfare.class)
                .getResultList();
    }

    public List<Welfare> searchWelfare(String keyword) {
        return em.createQuery("select w from Welfare w where w.welfare_service_name like concat('%', :keyword, '%')", Welfare.class)
                .setParameter("keyword", keyword)
                .getResultList();
    }

}
