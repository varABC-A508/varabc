package com.varabc.battle.config;

import java.security.Key;
        import javax.crypto.Cipher;
        import javax.crypto.spec.SecretKeySpec;
        import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class NumberEncryptor {

    private static final String ALGO = "AES";
    private static final byte[] keyValue =
            new byte[]{'Y', 'e', 'o', 'M', 'y', 'o', 'n', 'g', 'A', '5', '0', '8','e','v','e','r'};

    public String encrypt(long number) throws Exception {
        String numberStr = String.valueOf(number);
        Key key = generateKey();
        Cipher c = Cipher.getInstance(ALGO);
        c.init(Cipher.ENCRYPT_MODE, key);
        byte[] encVal = c.doFinal(numberStr.getBytes());
        return Base64.getUrlEncoder().withoutPadding().encodeToString(encVal); // URL-safe encoding
    }

    public long decrypt(String encryptedData) throws Exception {
        Key key = generateKey();
        Cipher c = Cipher.getInstance(ALGO);
        c.init(Cipher.DECRYPT_MODE, key);
        byte[] decodedValue = Base64.getUrlDecoder().decode(encryptedData); // URL-safe decoding
        byte[] decValue = c.doFinal(decodedValue);
        return Long.parseLong(new String(decValue));
    }


    private Key generateKey() throws Exception {
        return new SecretKeySpec(keyValue, ALGO);
    }
}

