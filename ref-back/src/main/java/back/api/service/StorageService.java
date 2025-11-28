package back.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {

    private final Path rootLocation;
    private final String apiBaseUrl;

    // Configurações do docker-compose/application.properties
    public StorageService(@Value("${FILE_UPLOAD_DIR}") String uploadDir,
                          @Value("${API_BASE_URL}") String apiBaseUrl) {
        this.rootLocation = Paths.get(uploadDir);
        this.apiBaseUrl = apiBaseUrl;
        try {
            Files.createDirectories(rootLocation); // Cria a pasta se não existir
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível criar o diretório de uploads.", e);
        }
    }

    public String uploadFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Falha ao armazenar arquivo vazio.");
            }

            // Gera um nome único: uuid + extensão original
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            
            // Caminho de destino
            Path destinationFile = this.rootLocation.resolve(Paths.get(filename))
                    .normalize().toAbsolutePath();

            // Garante que o arquivo está dentro da pasta permitida
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new RuntimeException("Não é possível armazenar o arquivo fora do diretório atual.");
            }

            // Copia o arquivo (físico)
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            // Retorna a URL completa que o Frontend vai usar para baixar
            return apiBaseUrl + "/api/arquivos/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Falha ao armazenar arquivo.", e);
        }
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Não foi possível ler o arquivo: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Não foi possível ler o arquivo: " + filename, e);
        }
    }
}