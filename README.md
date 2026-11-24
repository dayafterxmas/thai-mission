# 2026–2027 태국 치앙마이 동계 단기선교 후원 사이트

정적 사이트입니다. 서버·로그인·빌드 과정이 필요 없습니다.

```
index.html        본문, 카카오톡 미리보기 메타태그, 오픈채팅 주소 설정
css/style.css     디자인
js/main.js        오픈채팅 버튼 표시, 계좌번호 복사, 하단 이동 바
fonts/            Cafe24 PROSlim + Pretendard (WOFF2)
images/           team-photo.webp, team-logo.svg, title.svg, thailand.svg, og-image.jpg (images/README.txt 참고)
```

## 바꿀 항목
1. 오픈채팅 주소 — `index.html` 위쪽 `openChatUrl` (비우면 참여 버튼이 사라집니다)
2. 배포 주소 — `index.html`의 `https://YOUR-DOMAIN.example` 두 곳(`og:url`, `og:image`)
3. 단체사진 — `images/team-photo.webp` 덮어쓰기 (배경 제거 이미지)
4. 팀 로고 — `images/team-logo.svg` (현재 THAI · LOVED BY GOD 크림색 버전)
5. 카카오톡 대표 이미지 — `images/og-image.jpg` 덮어쓰기
6. 후원 계좌 — `index.html`의 `id="acct-num"` 숫자 (복사 버튼도 이 숫자를 그대로 복사합니다)

## 배포 순서 (Netlify Drop 기준)
1. 위 1~5번을 고친다.
2. 폴더째(index.html이 최상위에 오도록) https://app.netlify.com/drop 에 끌어다 놓는다. GitHub Pages, Cloudflare Pages, Vercel도 같은 방식으로 됩니다.
3. 발급된 주소를 2번 항목에 넣고 다시 올린다.
4. 카카오톡 공유 디버거(https://developers.kakao.com/tool/debugger/sharing)에서 주소를 검사해 미리보기를 확인한다. 이전 미리보기가 남아 있으면 같은 화면에서 캐시를 초기화한다.
5. 카카오톡으로 링크를 보낸다.

글꼴은 모두 사이트 안(fonts 폴더)에 들어 있어 외부 서버가 필요 없습니다.

## Firebase Hosting 배포 (GitHub 연동)
1. GitHub에서 새 저장소(예: `thailand-mission`)를 만들고 이 폴더 내용을 push
2. 터미널에서 이 폴더로 이동 후:
   - `npm i -g firebase-tools && firebase login`
   - `firebase init hosting:github` → 프로젝트 선택(새 프로젝트 가능), public 디렉터리는 `.`, 기존 firebase.json 덮어쓰기 `No`, 저장소 선택 → 이후 main에 push할 때마다 자동 배포
   - 최초 1회 수동 배포: `firebase deploy --only hosting`
3. 배포 주소(`https://프로젝트ID.web.app`)가 나오면 index.html의 `YOUR-DOMAIN.example` 2곳(og:url, og:image)을 그 주소로 바꿔 다시 배포
4. 카카오 공유 디버거(developers.kakao.com/tool/debugger/sharing)에서 주소를 넣어 미리보기 캐시 갱신
