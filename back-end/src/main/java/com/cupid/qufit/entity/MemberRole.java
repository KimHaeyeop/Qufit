package com.cupid.qufit.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberRole {
    USER("ROLE_USER"),ADMIN("ROLE_ADMIN");

    private final String key;
}