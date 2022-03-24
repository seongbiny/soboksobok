package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.dto.CharacterDto;
import com.soboksobok.soboksobok.domain.user.*;
import com.soboksobok.soboksobok.repository.user.*;
import com.soboksobok.soboksobok.repository.welfare.FamilyRepository;
import com.soboksobok.soboksobok.repository.welfare.TargetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UsedwelfareRepository userUsedRepository;
    private final LikeWelfareRepository likeWelfareRepository;
    private final SelectFamilyRepository selectFamilyRepository;
    private final SelectTargetRepository selectTargetRepository;
    private final TargetRepository targetRepository;
    private final FamilyRepository familyRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    public List<Usedwelfare> getUsed(User userSeq){
        System.out.println("userSeq: "+userSeq.getUserSeq());
        List<Usedwelfare> li = userUsedRepository.findByUser_UserSeq(userSeq.getUserSeq());
        System.out.println(li);
        return li;
    }

    public List<Usedwelfare> getAllUsedList(){
        List<Usedwelfare> li = userUsedRepository.findAll();
        return li;
    }

    public void setUserUsedRepository(Usedwelfare used){
        userUsedRepository.save(used);
    }

    public void deleteUserUsedRepository(Usedwelfare used){
        userUsedRepository.delete(used);
    }

    public List<Likewelfare> getLike(User user){
        List<Likewelfare> li = likeWelfareRepository.findByUser_UserSeq(user.getUserSeq());
        return li;
    }

    public List<Likewelfare> getAllLikeList(){
        List<Likewelfare> li = likeWelfareRepository.findAll();
        return li;
    }

    public void setLikeRepository(Likewelfare like){
        likeWelfareRepository.save(like);
    }

    public void deleteLikeRepository(Likewelfare like){
        likeWelfareRepository.delete(like);
    }

    @Transactional
    public void updateUserCharacter(CharacterDto dto, String userId){
        User user = getUser(userId);
        System.out.println("userseq: "+user.getUserSeq());
        System.out.println("dto: "+dto.toString());
        user.setChild(dto.getChild());
        user.setRegion(dto.getRegion());
        userRepository.save(user);
        selectTargetRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        selectFamilyRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        Selecttarget selecttarget;
        Selectfamily selectfamily;
        for(int i=0;i<dto.getJob().size();i++){
            selecttarget = new Selecttarget();
            selecttarget.setUser(user);
            selecttarget.setTarget(targetRepository.findByTargetId(dto.getJob().get(i)));
            selectTargetRepository.save(selecttarget);
        }
        for(int i=0;i<dto.getFamily().size();i++){
            selectfamily = new Selectfamily();
            selectfamily.setUser(user);
            selectfamily.setFamily(familyRepository.findByFamilyId(dto.getFamily().get(i)));
            selectFamilyRepository.save(selectfamily);
        }
    }

    public List<Long> getAllSelectFamily(Long userSeq){
        List<Selectfamily> li =  selectFamilyRepository.findByUser_UserSeq(userSeq);
        List<Long> res = new ArrayList<>();
        for(Selectfamily i : li){
            res.add(i.getFamily().getFamilyId());
        }
        return res;
    }

    public List<Long> getAllSelectTarget(Long userSeq){
        List<Selecttarget> li =  selectTargetRepository.findByUser_UserSeq(userSeq);
        List<Long> res = new ArrayList<>();
        for(Selecttarget i : li){
            res.add(i.getTarget().getTargetId());
        }
        return res;
    }
}
