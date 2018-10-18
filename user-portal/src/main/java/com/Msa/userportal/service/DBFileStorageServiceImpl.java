package com.Msa.userportal.service;

import com.Msa.userportal.exception.FileStorageException;
import com.Msa.userportal.exception.MyFileNotFoundException;
import com.Msa.userportal.model.DBFile;
import com.Msa.userportal.model.User;
import com.Msa.userportal.repository.DBFileRepository;
import com.Msa.userportal.security.CurrentUser;
import com.Msa.userportal.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class DBFileStorageServiceImpl implements DBFileStorageService {

    @Autowired
    DBFileRepository dbFileRepository;

    @Autowired
    @Qualifier("userServicer")
    UserService userService;

    @Override
    public DBFile storeFile(MultipartFile file, UserPrincipal currentUser) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence" + fileName);
            }

            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());
            long id = currentUser.getId();
            Optional<User> user = userService.getById(id);
            dbFile.setUser(user.get());
            user.get().setAvatar(dbFile);

            return dbFileRepository.save(dbFile);

        } catch (IOException e) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", e);
        }
    }

    @Override
    public DBFile getFile(String fileId) {
        return dbFileRepository.findById(fileId).
                orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }
}
