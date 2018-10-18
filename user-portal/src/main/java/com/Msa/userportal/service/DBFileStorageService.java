package com.Msa.userportal.service;

import com.Msa.userportal.model.DBFile;
import com.Msa.userportal.security.UserPrincipal;
import org.springframework.web.multipart.MultipartFile;

public interface DBFileStorageService {

    DBFile storeFile(MultipartFile file, UserPrincipal currentUser);

    DBFile getFile(String fileId);
}
