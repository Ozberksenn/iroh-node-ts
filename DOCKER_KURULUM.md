# Docker Kurulum Rehberi

## Windows için Docker Desktop Kurulumu

### 1. Docker Desktop İndirme
1. [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) sayfasına gidin
2. "Download for Windows" butonuna tıklayın
3. İndirilen `Docker Desktop Installer.exe` dosyasını çalıştırın

### 2. Kurulum Adımları
1. Kurulum sırasında "Use WSL 2 instead of Hyper-V" seçeneğini işaretleyin (önerilir)
2. Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın
3. Docker Desktop'ı başlatın

### 3. Kurulumu Doğrulama
PowerShell veya Command Prompt'ta şu komutu çalıştırın:
```bash
docker --version
docker-compose --version
```

Her iki komut da versiyon numarası göstermelidir.

## Projeyi Çalıştırma

### 1. .env Dosyası Oluşturma
Proje kök dizininde `.env` dosyası oluşturun ve şu içeriği ekleyin:

```env
# SQL Server Configuration
SA_PASSWORD=YourStrong@Passw0rd
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=YourStrong@Passw0rd
DB_NAME=Iroh

# Frontend API Configuration
VITE_API_BASE=http://localhost:8080
```

**NOT:** `VITE_API_BASE` değişkeni frontend'in backend API'ye bağlanması için kullanılır. Docker container'ları içinde çalışırken, backend servisine `app` hostname'i ile erişilebilir. Ancak tarayıcıdan erişim için `http://localhost:8080` kullanılmalıdır.

**ÖNEMLİ:** Production ortamında şifreleri değiştirmeyi unutmayın!

### 2. Docker Compose ile Çalıştırma

**NOT:** Proje kök dizininde (iroh-node-ts ve playground-management klasörlerinin üst dizininde) docker-compose.yml dosyası bulunmaktadır.

```bash
# Proje kök dizinine gidin
cd ..

# Servisleri başlat (Backend, Frontend ve Database)
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Belirli bir servisin loglarını görüntüle
docker-compose logs -f app      # Backend
docker-compose logs -f frontend # Frontend
docker-compose logs -f db       # Database

# Servisleri durdur
docker-compose down

# Veritabanı verilerini de silmek için
docker-compose down -v
```

### 3. Servislere Erişim

- **Backend API:** http://localhost:8080
- **Frontend:** http://localhost:3000
- **Database:** localhost:1433

### 4. Veritabanını Oluşturma
Docker container'ları çalıştıktan sonra, veritabanını oluşturmanız gerekebilir:

```bash
# SQL Server container'ına bağlan
docker exec -it iroh-db /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd

# SQL Server'da veritabanı oluştur
CREATE DATABASE Iroh;
GO
```

## Sorun Giderme

### Docker Desktop başlamıyor
- WSL 2'nin kurulu olduğundan emin olun
- Windows özelliklerinde "Virtual Machine Platform" ve "Windows Subsystem for Linux" etkin olmalı

### Port çakışması
- 8080 (Backend), 3000 (Frontend) veya 1433 (Database) portları kullanılıyorsa, docker-compose.yml'de port numaralarını değiştirin

### Container'lar çalışmıyor
```bash
# Container loglarını kontrol edin
docker-compose logs

# Container'ları yeniden başlatın
docker-compose restart
```
