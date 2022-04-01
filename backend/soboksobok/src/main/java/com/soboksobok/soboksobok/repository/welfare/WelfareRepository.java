package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
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

    public List<Welfare> getSimilar(Long id) {
        String similar_words = em.find(Welfare.class, id).getWelfare_similarwelfare().replace("[", "").replace("]", "");

        String[] sim_words = similar_words.split(", ");
        List<Long> similars = new ArrayList<>(10);

        for (int i = 0; i < sim_words.length; i ++) {
            System.out.println(sim_words[i]);
            similars.add(Long.valueOf(sim_words[i]));
        }

        return em.createQuery("select w from Welfare w where w.welfareId in :similars ", Welfare.class)
                .setParameter("similars", similars)
                .getResultList();
    }

    public List<Welfare> getGroupWelfare(Long group_id) {
        return em.createQuery("select w from Welfare w where w.welfare_group = :group_id", Welfare.class)
                .setParameter("group_id", group_id)
                .getResultList();
    }

//    public List<Array> exportWelfarePurpose(List<Welfare> welfareList) {
//        System.out.println(welfareList);
//        return new ArrayList<>();
//    }
}
