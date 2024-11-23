# SurveyApp

Kullanıcı anketleri için temiz arayüzlü ve gerçek zamanlı ilerleme takibi yapabilen React Native mobil uygulaması.

## Özellikler

- **Kullanıcı Doğrulaması**
  - Güvenli giriş ve kayıt
  - Profil yönetimi
- **Anket Özellikleri**
  - Çoklu dil desteği (İngilizce/Türkçe) ve **_dil seçimi_**
  - Zamanlı anket oturumları
  - Gerçek zamanlı ilerleme takibi
- **Soru Tipleri**
  - Renkli göstergeli derecelendirme ölçekleri
  - Kaydırıcı tabanlı yanıtlar
  - Çoktan seçmeli sorular
- **Veri Yönetimi**
  - Anket tamamlama izleme
  - Redux ile kalıcı depolama
  - Profil özelleştirme

## Teknolojiler

- **Frontend Framework**: React Native, Expo
- **State Yönetimi**: Redux
- **Screen Route**: React Navigation
- **UI Components**: React Native Paper, React Native Elements
- **Request Yonetimi**: Axios
- **Dil Yonetimi**: i18n

## Proje Yapısı

```
app/
├── App.js                 # Ana uygulama bileşeni
├── src/
│   ├── assets/           # Görseller ve statik dosyalar
│   ├── components/       # Yeniden kullanılabilir bileşenler
│   │   ├── Alert/
│   │   └── Loader/
│   ├── config/          # Yapılandırma dosyaları
│   ├── constants/       # Sabitler ve tema
│   ├── lang/           # Çeviri dosyaları
│   ├── navigation/     # Navigasyon yapılandırması
│   ├── redux/          # Redux store, actions, reducers
│   └── screens/        # Uygulama ekranları
├── Home/
├── Login/
├── Profile/
├── Questions/
└── Survey/
```

## Kurulum ve Başlatma

```bash
# Paketleri yükle
npm install

# Uygulamayı başlat
npx expo start
```

## Kullanıcı Bilgileri

- Kullanıcı Adı: mor_2314
- Şifre: 83r5^_

---

# SurveyApp

A React Native mobile application for conducting user surveys with a clean interface and real-time progress tracking.

## Features

- **User Authentication**
  - Secure login and registration
  - Profile management
- **Survey Capabilities**
  - Multi-language support (English/Turkish) and **_language selection_**
  - Timed survey sessions
  - Real-time progress tracking
- **Question Types**
  - Rating scales with color indicators
  - Slider-based responses
  - Multiple choice questions
- **Data Management**
  - Survey completion monitoring
  - Persistent storage with Redux
  - Profile customization

## Tech Stack

- **Frontend Framework**: React Native, Expo
- **State Management**: Redux
- **Navigation**: React Navigation
- **UI Components**: React Native Paper, React Native Elements
- **Network**: Axios
- **Localization**: i18n

## Project Structure

```
app/
├── App.js                 # Root application component
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable components
│   │   ├── Alert/
│   │   └── Loader/
│   ├── config/          # Configuration files
│   ├── constants/       # Constants and theme
│   ├── lang/           # Translation files
│   ├── navigation/     # Navigation configuration
│   ├── redux/          # Redux store, actions, reducers
│   └── screens/        # Application screens
├── Home/
├── Login/
├── Profile/
├── Questions/
└── Survey/
```

## Installation and Start

```bash
# Install dependencies
npm install

# Start the application
npx expo start
```

## User Information

- Username: mor_2314
- Password: 83r5^_

