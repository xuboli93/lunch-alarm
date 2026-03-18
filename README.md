# 📁 GitHub 업로드 안내

## 업로드할 파일 목록

GitHub Repository에 아래 파일/폴더를 **그대로** 업로드하세요.

```
📦 업로드할 파일 목록
│
├── 📄 index.html
├── 📄 manifest.json
├── 📄 sw.js
├── 📄 qr.html
│
├── 📁 css/
│   └── 📄 style.css
│
├── 📁 js/
│   └── 📄 app.js
│
└── 📁 .github/
    └── 📁 workflows/
        └── 📄 lunch-alarm.yml   ← ⭐ 이게 핵심!
```

---

## 🚀 GitHub 업로드 순서

### 1단계 - Repository 생성
```
1. github.com 로그인
2. 우측 상단 "+" → "New repository"
3. Repository name: siksu-alarm
4. Public 선택
5. "Create repository" 클릭
```

### 2단계 - 파일 업로드
```
1. 생성된 Repository 페이지에서
2. "uploading an existing file" 클릭
3. 위 파일 목록 전체 드래그 앤 드롭
4. "Commit changes" 클릭
```

> ⚠️ .github/workflows/ 폴더는
> 폴더째로 드래그해야 합니다!

### 3단계 - Secret 등록 (API URL)
```
1. Repository → Settings 탭
2. 좌측 "Secrets and variables" → "Actions"
3. "New repository secret" 클릭
4. Name: APP_API_URL
5. Value: https://dc2b89db-ceff-479f-b727-4f7829ae231e.vip.gensparksite.com
6. "Add secret" 클릭
```

### 4단계 - Actions 활성화 확인
```
1. Repository → "Actions" 탭
2. "lunch-alarm.yml" 워크플로우 확인
3. "Run workflow" 버튼으로 테스트 실행
```

---

## ⏰ 알람 시간 변경 방법

`lunch-alarm.yml` 파일에서 cron 값을 수정하세요.

| 원하는 시간 | cron 값 |
|------------|---------|
| 오전 10:00 | `0 1 * * 1-5` |
| 오전 10:30 | `30 1 * * 1-5` |
| 오전 11:00 | `0 2 * * 1-5` |
| 오전 9:00  | `0 0 * * 1-5` |

> KST = UTC + 9 이므로 9시간을 빼서 입력!

---

## ✅ 완료 후 동작 방식

```
매일 오전 10:30 (월~금)
→ GitHub Actions 자동 실행
→ 앱 DB에 알림 신호 저장
→ 각자 폰의 Service Worker가 신호 감지
→ 브라우저 꺼져 있어도 푸시 알림 도착! 🔔
```
