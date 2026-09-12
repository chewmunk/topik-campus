# TOPIK Campus — 프로젝트 계획

> 상태: **Phase 1 구현 중**  
> 작성일: 2026-09-12  
> 저장 위치: `/Users/choi/dev/topik-campus`

이 문서는 범위, 기술 선택, SEO/도메인 전략, 배포 순서를 정리한다.  
Phase 1 랜딩·로케일 라우팅·SEO는 코드로 구현한다.

---

## 1. 서비스 정보

| 항목 | 값 |
|------|-----|
| 서비스명 | TOPIK Campus |
| 운영 도메인 | https://topikcampus.com |
| 보조 도메인 | https://www.topikcampus.com |
| 대표 도메인 | https://topikcampus.com |
| www 정책 | `www.topikcampus.com` → `topikcampus.com` **301 리다이렉트** |
| 미리보기 배포 | https://topikcampus.vercel.app |
| 서비스 유형 | 외국인을 위한 TOPIK 시험 학습 플랫폼 및 커뮤니티 |
| 관계 고지 | **공식 TOPIK 운영기관(국립국제교육원 등)과 관계없는 독립 서비스** |

### 1.1 도메인 운영 원칙

- 검색·공유·canonical·구조화 데이터의 URL은 항상 **대표 도메인** (`https://topikcampus.com`)을 쓴다.
- `www`는 콘텐츠를 따로 두지 않고, 경로·쿼리를 유지한 채 apex로 301한다.
- 초기에는 Vercel 기본 도메인(`topikcampus.vercel.app`)만 연결하고, 커스텀 도메인은 DNS 준비 후 붙인다.
- `topikcampus.vercel.app`은 스테이징/프리뷰용으로 남기되, 프로덕션 SEO는 커스텀 도메인만 인덱싱되게 `robots`/`canonical`을 맞춘다.

### 1.2 필수 고지 (전 페이지 공통)

공식 시험 기관으로 오인되지 않도록 푸터와 About에 아래 취지를 고정한다.

> TOPIK Campus is an independent learning platform and is not affiliated with, endorsed by, or connected to the official TOPIK administering organization.

한국어 병기(추가 언어 도입 시 해당 언어로 번역):

> TOPIK Campus는 공식 TOPIK 운영기관과 무관한 독립 학습 플랫폼입니다.

---

## 2. 브랜드

| 항목 | 값 |
|------|-----|
| 영문 표기 | TOPIK Campus |
| 도메인 표기 | topikcampus.com |
| 기본 슬로건 | Learn. Practice. Pass Together. |
| 서비스 설명 | The global learning community for TOPIK learners. |
| 기본 언어 | 영어 (`en`) |
| 추가 예정 언어 | 한국어(`ko`), 베트남어(`vi`), 인도네시아어(`id`), 중국어(`zh`) |
| 타깃 사용자 | TOPIK I·II를 준비하는 해외 및 국내 거주 외국인 |

### 2.1 제품 목표 (핵심 기능)

1. TOPIK 문제풀이
2. AI 쓰기 첨삭
3. 학습 진도관리
4. 질문·답변
5. 스터디 모집
6. 시험 후기 공유

### 2.2 브랜드 톤

- 영어 우선, 시험 기관처럼 보이지 않는 **학습 커뮤니티** 톤
- 자신감·함께 공부하는 느낌 (`Pass Together`)
- 과장된 “공식/인증” 표현 금지
- UI 카피는 짧고 명확하게. 초보 학습자도 읽기 쉬운 영어

### 2.3 시각 자산 (구현 시 필요)

| 자산 | 용도 | 비고 |
|------|------|------|
| 로고 (워드마크 + 마크) | 헤더, OG, 파비콘 원본 | SVG 우선 |
| Favicon | 브라우저 탭 | `favicon.ico` + `icon.svg` |
| App icon | iOS/Android 홈 화면 | `apple-touch-icon` 180×180, PWA 192/512 |
| Open Graph 이미지 | SNS/카카오/슬랙 미리보기 | 1200×630, 기본 1장 |
| 컬러/타이포 | 랜딩·앱 공통 | 구현 전 토큰만 확정 |

OG 이미지 초안 카피:

- 상단: TOPIK Campus
- 중단: Learn. Practice. Pass Together.
- 하단: topikcampus.com

---

## 3. 이번 사이클에서 하지 않을 것

구현 지시가 오기 전까지 아래는 수행하지 않는다.

- Next.js 프로젝트 생성 (`create-next-app` 포함)
- 의존성 설치, 로컬 서버 실행
- GitHub 저장소 생성·푸시
- Vercel 프로젝트 생성·배포
- 커스텀 도메인 DNS 연결
- DB/Auth/AI API 연동
- 실제 문제 데이터·커뮤니티 기능 구현

---

## 4. 권장 기술 스택

목표: **Next.js 앱 하나**로 마케팅 사이트 + 학습 앱을 시작하고, Vercel에 바로 올린다.

| 영역 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | **Next.js (App Router) + TypeScript** | 요청 범위. SEO·메타데이터·리다이렉트에 적합 |
| 스타일 | Tailwind CSS | 랜딩·앱 UI를 빠르게 통일 |
| UI 기반 | React Server Components + 최소 클라이언트 | 마케팅은 SSG, 커뮤니티는 ISR/SSR. 로케일 HTML을 빌드마다 전부 찍지 않음 |
| 패키지 매니저 | pnpm 또는 npm (구현 시 하나 고정) | 저장소 루트 = 앱 루트 |
| 호스팅 | **Vercel** | `topikcampus.vercel.app` 프로젝트명으로 생성 |
| 소스 | **GitHub** | Vercel Git 연동, Preview 배포 |
| 메타데이터 | Next.js Metadata API | title/description/canonical/OG/hreflang |
| 사이트맵 | `app/sitemap.ts`, `app/robots.ts` | 인덱스 제어 |
| 구조화 데이터 | JSON-LD (`WebSite`, `Organization`, `BreadcrumbList`) | 요청 SEO 항목 |
| 다국어 UI | `next-intl` + `/{locale}` | 우측 상단 선택기. 커뮤니티는 하나 |
| 콘텐츠 번역 | DB `translations` + AI 큐 | 원문 1건 → 나머지 로케일 자동 생성 |
| 폰트 | `next/font` | 레이아웃 시프트 방지 |

### 4.1 이후 단계 후보 (지금은 결정만, 설치 안 함)

학습·커뮤니티가 붙으면 아래 중에서 고른다. 1차는 랜딩 + SEO 뼈대만으로도 배포 가능하다.

| 영역 | 1순위 후보 | 대안 |
|------|------------|------|
| Auth | Clerk 또는 Supabase Auth | NextAuth |
| DB | Supabase (Postgres) | PlanetScale / Neon |
| 파일/이미지 | Vercel Blob 또는 Supabase Storage | Cloudinary |
| AI 첨삭 | OpenAI / Anthropic API | 자체 프롬프트 + 채점 루브릭 |
| 분석 | Vercel Analytics + GA4 | Plausible (쿠키 부담 적음) |
| 이메일 | Resend | Postmark |

**1차 구현(승인 후)은 백엔드 없이** 정적/서버 랜딩 + 법적 고지 + SEO 메타만으로 배포하는 것을 권장한다.

---

## 5. 정보 구조 (IA)

**커뮤니티는 언어별로 쪼개지 않는다.** 글·댓글·스터디·후기는 전 세계 사용자가 같은 스레드를 본다.  
언어는 “다른 게시판”이 아니라 **같은 데이터의 표시 언어**다.

URL만 로케일을 앞에 둔다. 오른쪽 위 언어 선택은 쿠키만 바꾸지 않고, 경로의 `/en` → `/ko`처럼 **같은 글의 다른 언어 URL로 이동**한다.

```
/{locale}/                         홈
/{locale}/about
/{locale}/topik
/{locale}/practice                 문제풀이 (이후)
/{locale}/mock-test
/{locale}/writing
/{locale}/progress                 로그인 필요
/{locale}/community
/{locale}/community/questions
/{locale}/community/questions/{id}
/{locale}/community/study-groups
/{locale}/community/reviews
/{locale}/blog
/{locale}/legal/terms
/{locale}/legal/privacy
/{locale}/legal/disclaimer
```

`locale`: `en` | `ko` | `vi` | `id` | `zh`  
루트 `/` 는 쿠키 또는 `Accept-Language`로 추정한 로케일로 보내고, 없으면 `/en`.

같은 질문의 예:

- `https://topikcampus.com/en/community/questions/42`
- `https://topikcampus.com/vi/community/questions/42`

게시글 ID `42`는 하나다. 베트남어 사용자는 번역된 제목·본문을 보고, 댓글도 같은 스레드다.

### 5.1 다국어 결정 (SEO)

**판단: DB에 언어별 번역을 저장하되, 보여주는 주소는 언어별로 나눈다.**

쿠키/같은 URL에서 언어만 바꿔 그리면 구현은 쉽지만, 구글은 그 URL을 **기본 언어 한 장**으로만 색인하는 경우가 많다. TOPIK Campus 타깃(영·한·베·인니·중)은 현지 검색어가 서로 달라서, 이 방식은 성장 채널을 버린다.

| 방식 | 커뮤니티 | SEO | 채택 |
|------|----------|-----|------|
| 언어별 별도 커뮤니티 (베 게시판 / 한 게시판) | 대화가 갈라짐 | URL은 나뉨 | 안 함 |
| 같은 URL + 쿠키/JS로 언어 전환, DB에서 번역 fetch | 하나 | 거의 영어만 색인 | 안 함 |
| **같은 커뮤니티 + `/{locale}/...` + DB 번역 + 서버 렌더** | 하나 | 언어별 색인·hreflang | **이 방향** |

해야 할 것:

1. **하나의 원문**을 저장하고, AI가 나머지 로케일로 번역해 `translations` 테이블에 넣는다.
2. 페이지는 요청 로케일에 맞는 번역을 **서버에서 HTML로** 내려준다. 클라이언트에서만 바꾸면 크롤러가 못 본다.
3. 언어 선택기는 우측 상단. 누르면 경로의 locale만 바꾸고 글 ID는 유지한다. 선호 언어는 쿠키에 기억한다.
4. 각 언어 URL은 자기 canonical, `html lang`, OG, hreflang 세트를 가진다.
5. 번역이 아직 없거나 품질 게이트 미통과면 그 로케일은 `noindex` 하거나 원문을 보여 주되 hreflang에는 넣지 않는다. 자동 번역 스팸으로 보이지 않게 한다.

하지 말 것:

- `?lang=ko` 쿼리로 언어를 나누기 (색인 신호가 약하다)
- 언어마다 다른 글 ID / 다른 댓글 트리
- 번역본을 원문과 무관한 새 글로 저장하기

### 5.2 데이터 모델 초안

```
posts
  id, author_id, type, original_locale, created_at, ...

post_translations
  post_id, locale, title, body, slug,
  source ('original' | 'ai' | 'human'),
  quality_status ('pending' | 'ready' | 'rejected'),
  translated_at

comments / comment_translations   (동일 패턴)
```

흐름: 작성 → 원문 저장 → 번역 큐 → 대상 언어 생성 → `ready`면 해당 `/{locale}/...` 색인.

신뢰: 번역 글에는 “AI translation of the original {locale} post” 표시. 원문 수정 시 재번역(디바운스). 작성자가 특정 언어를 고치면 `human`으로 고정하고 그 언어는 덮어쓰지 않는다.

슬러그: 1차는 언어 공통 `id`만으로도 충분하다. 이후 로케일별 slug를 번역 테이블에 두면 현지 검색에 더 유리하다.

### 5.3 렌더링 결정 — 매번 정적 페이지를 만들지 않는다

**판단: `/{locale}` URL ≠ 빌드 때 HTML을 언어별로 찍어 두는 것.**  
라우트는 하나(`[locale]/community/questions/[id]`)이고, 요청이 오면 DB에서 해당 언어 번역을 읽어 HTML을 만든다. 글이 생기거나 번역이 끝날 때마다 정적 파일을 생성·커밋하지 않는다.

구글은 SSG가 있어야 색인하는 것이 아니다. **완성된 HTML에 그 언어 본문이 있으면** SSR이든 ISR이든 색인된다. 정적 생성은 속도·비용 최적화일 뿐, SEO 전제 조건이 아니다.

| 페이지 | 렌더 | 이유 |
|--------|------|------|
| 홈, About, Legal, 마케팅 | **SSG** (로케일×소수 페이지) | 거의 안 바뀜. 5언어 × 10페이지 수준 |
| 문제 은행, 해설 | **ISR** (시간 또는 태그 재생성) | 가끔 바뀜. 트래픽은 많음 |
| 커뮤니티 글·댓글 | **온디맨드 캐시 (ISR)** | 글은 계속 생김. 빌드에 다 넣으면 폭발 |
| 진도, 설정, 작성 화면 | **동적 SSR** + noindex | 개인화. 색인 불필요 |

커뮤니티를 빌드 타임 SSG로 가면 글 1만 × 언어 5 = 5만 페이지를 배포마다 다시 뽑아야 한다. 번역이 비동기로 늦게 도착하면 그 언어 URL은 빈 페이지가 된다.

대신 이렇게 한다:

1. 원문 저장 → 사용자는 즉시 원문 언어 URL을 본다.
2. AI 번역이 `ready`가 되면 DB 행만 추가하고 `revalidateTag('post-42')`로 그 URL 캐시만 지운다.
3. 다음 요청(또는 크롤러)이 `/vi/community/questions/42`를 치면 그때 HTML을 만들어 CDN에 올린다.
4. 사이트 전체를 다시 빌드하지 않는다.

목록 페이지(`/community/questions`)는 글이 자주 바뀌므로 짧은 ISR 또는 동적에 가깝게 두고, **상세 페이지**를 캐시하는 편이 검색·공유에 이득이다.

Phase 1 랜딩만 할 때는 페이지가 몇 장 없으니 로케일별 SSG가 맞다. 커뮤니티가 붙는 순간부터는 “파일로 페이지를 만든다”가 아니라 “주소는 언어별, 본문은 DB, 캐시는 글 단위”다.

---

## 6. 화면 범위 — 페이즈

### Phase 0 — 계획 (현재)

- [x] 폴더 `topik-campus` 생성
- [x] 본 계획 문서 작성
- [ ] 계획 확정 후 구현 지시

### Phase 1 — 스캐폴딩 · 브랜드 · SEO · 배포

구현 지시가 오면 **이것만** 먼저 한다.

1. Next.js + TypeScript + Tailwind 앱 생성
2. `/{locale}` 라우팅 뼈대, 브랜드 토큰, 레이아웃(헤더/푸터/우측 언어 선택기)
3. 홈 / About / Disclaimer / 빈 허브 페이지 (영문 카피, locale URL)
4. Favicon, app icon, 기본 OG 이미지
5. Metadata, canonical, JSON-LD, sitemap, robots
6. www → apex 301 (커스텀 도메인 연결 시)
7. GitHub 저장소 생성 및 푸시
8. Vercel 프로젝트명 `topikcampus` → `https://topikcampus.vercel.app`

### Phase 2 — 학습 코어

- TOPIK I / II 레벨 선택
- 문제풀이 UX (객관식 우선)
- 해설, 북마크, 오답
- 모의고사 타이머·채점

### Phase 3 — AI 쓰기 · 진도

- 쓰기 문항 제출
- AI 첨삭 (점수 추정 + 수정 제안 + 예시)
- 학습 스트릭, 레벨별 진도

### Phase 4 — 커뮤니티

- Q&A, 스터디 모집, 시험 후기 — **단일 커뮤니티**
- 작성 시 원문 locale 저장 + AI 번역 파이프라인
- 신고/모더레이션, 비로그인 열람 범위
- 번역 품질 게이트, AI 번역 표시

### Phase 5 — 다국어 UI · SEO 라우팅

Phase 1부터 `/{locale}` 뼈대와 우측 상단 언어 선택기는 넣어 둔다.  
이 단계에서 UI 카피(`ko/vi/id/zh`)와 hreflang·로케일 sitemap을 완성한다.  
커뮤니티 글 번역은 Phase 4와 함께 간다. 언어별 사이트가 아니다.

---

## 7. SEO 기본정보

| 항목 | 값 |
|------|-----|
| Site name | TOPIK Campus |
| Default title | TOPIK Campus — Learn, Practice and Pass TOPIK |
| Default description | Prepare for TOPIK with practice questions, mock tests, AI writing feedback and a global learner community. |
| 기본 OG 이미지 | 필요 (1200×630) |
| Favicon / App icon | 필요 |
| Canonical | **페이지마다** 대표 도메인 절대 URL |
| hreflang | 다국어 적용 시 설정 |
| 구조화 데이터 | `WebSite`, `Organization`, `BreadcrumbList` |

### 7.1 Title / Description 규칙

- 홈: Default title / description 그대로
- 하위 페이지: `{Page name} | TOPIK Campus`
- description 150–160자 영문, 키워드 남용 금지
- `template`를 `layout`에 두고 페이지에서 `title`만 덮어쓴다

### 7.2 Canonical

- 형식: `https://topikcampus.com/{locale}{path}`
- 쿼리스트링(utm, sort 등)은 canonical에 넣지 않는다
- Vercel 프리뷰 URL은 canonical을 프로덕션 로케일 URL로 두고, `robots: noindex` (프리뷰만)

### 7.3 Open Graph / Twitter

```
og:site_name   TOPIK Campus
og:title       (페이지 title과 동일)
og:description (페이지 description과 동일)
og:type        website (글은 article)
og:url         canonical과 동일
og:image       https://topikcampus.com/og/default.png
twitter:card   summary_large_image
```

### 7.4 robots / sitemap

- `https://topikcampus.com/robots.txt`
- `https://topikcampus.com/sitemap.xml`
- 인덱싱: 마케팅·가이드·공개 학습 허브
- 비인덱싱: 로그인, 설정, 검색 결과, 프리뷰 배포, 작성 중인 커뮤니티 글(정책에 따름)

### 7.5 구조화 데이터 (JSON-LD)

**WebSite**

- `@type`: WebSite
- `name`: TOPIK Campus
- `url`: https://topikcampus.com
- `description`: The global learning community for TOPIK learners.
- `inLanguage`: en (다국어 시 배열 확장)
- `potentialAction`: SearchAction (사이트 검색이 생긴 뒤)

**Organization**

- `@type`: Organization
- `name`: TOPIK Campus
- `url`: https://topikcampus.com
- `logo`: https://topikcampus.com/icon.png
- 공식 시험 기관 사칭으로 읽힐 `sameAs`/교육기관 타입은 쓰지 않는다

**BreadcrumbList**

- 홈을 제외한 하위 페이지에 적용
- 예: Home → Practice → TOPIK II

홈 `layout`에 WebSite + Organization, 하위는 BreadcrumbList를 추가로 넣는다.

### 7.6 hreflang (다국어 이후)

각 언어 페이지에:

```
en    https://topikcampus.com/en/...
ko    https://topikcampus.com/ko/...
vi    https://topikcampus.com/vi/...
id    https://topikcampus.com/id/...
zh    https://topikcampus.com/zh/...
x-default  https://topikcampus.com/en/...
```

자기 자신을 포함한 전체 로케일 세트를 넣고, canonical은 **해당 언어 URL**로 둔다.

### 7.7 파비콘 · 앱 아이콘 (구현 시 파일)

```
app/icon.svg
app/favicon.ico
app/apple-icon.png          180×180
public/og/default.png       1200×630
public/icons/icon-192.png
public/icons/icon-512.png
```

Next.js Metadata `icons` / `manifest`와 연결한다.

---

## 8. Next.js 앱 구조 (예정)

저장소 루트가 곧 Next.js 루트다. 모노레포는 1차에서 쓰지 않는다.

```
topik-campus/
  PLAN.md                 ← 현재 문서
  README.md               ← 구현 시 추가
  package.json
  next.config.ts
  src/
    app/
      layout.tsx          글로벌 메타, JSON-LD
      page.tsx            홈
      sitemap.ts
      robots.ts
      about/
      legal/
      ...
    components/
      layout/             Header, Footer, LocaleSwitcher
      seo/                JsonLd
    lib/
      site.ts             도메인, 슬로건, SEO 상수
      i18n.ts
    styles/
  public/
    og/
    icons/
```

### 8.1 `lib/site.ts`에 둘 상수

구현 시 한 파일에서 도메인·카피를 관리한다.

- `SITE_NAME`
- `SITE_URL` = `https://topikcampus.com`
- `VERCEL_URL` = `https://topikcampus.vercel.app`
- `SLOGAN`
- `TAGLINE`
- `DEFAULT_TITLE`
- `DEFAULT_DESCRIPTION`
- `LOCALES` = `['en', 'ko', 'vi', 'id', 'zh']`
- `DEFAULT_LOCALE` = `'en'`

환경별 분기:

- Production custom domain → `SITE_URL`
- Vercel preview → noindex + canonical은 여전히 `SITE_URL`

### 8.2 리다이렉트

커스텀 도메인 연결 후 Vercel / `next.config`에서:

1. `https://www.topikcampus.com/:path*` → `https://topikcampus.com/:path*` (308/301)
2. `http` → `https` (Vercel 기본)

---

## 9. GitHub

구현 승인 후 순서:

1. `topik-campus`에서 Next.js 앱 생성
2. `.gitignore` 확인 (`.env*`, `.vercel`)
3. 로컬 git init (이미 상위 폴더에 묶여 있으면 루트를 이 폴더로)
4. GitHub 저장소 생성  
   - 권장 이름: `topik-campus`  
   - 공개/비공개는 구현 시 확인 (학습 플랫폼이면 Public 가능, 문제 저작권 이슈가 있으면 Private)
5. `main` 브랜치 푸시
6. README에 서비스명, 슬로건, 비제휴 고지, 로컬 실행법

커밋 메시지 톤: 왜 바꿨는지를 한두 문장. 구현 요청이 오기 전에는 커밋하지 않는다.

---

## 10. Vercel 배포

| 항목 | 계획 값 |
|------|---------|
| 프로젝트명 | `topikcampus` |
| 프로덕션 URL | https://topikcampus.vercel.app |
| Framework Preset | Next.js |
| Root Directory | `.` (저장소 루트) |
| Production Branch | `main` |
| Node.js | 프로젝트 생성 시점 LTS |

### 10.1 배포 순서 (구현 시)

1. GitHub 연동으로 프로젝트 생성, 이름을 **`topikcampus`** 로 지정  
   → 기본 도메인이 `topikcampus.vercel.app`이 됨
2. Production 배포 확인
3. Deployment Protection(SSO)이 켜져 있으면 **공개 접근**으로 변경
4. 이후 `topikcampus.com` / `www.topikcampus.com`을 Domains에 추가
5. www에 301 to apex 설정
6. 환경 변수는 Auth/DB/AI가 붙을 때 추가

### 10.2 환경 변수 (이후)

1차 랜딩만이면 거의 필요 없다.

| 키 | 시점 | 설명 |
|----|------|------|
| `NEXT_PUBLIC_SITE_URL` | 1차부터 권장 | `https://topikcampus.com` |
| `OPENAI_API_KEY` 등 | Phase 3 | 쓰기 첨삭 |
| Auth/DB 키 | Phase 2~4 | 선택한 백엔드에 따름 |

---

## 11. 법적 · 콘텐츠 리스크

- **비제휴 고지**를 푸터 고정 + `/legal/disclaimer`
- 공식 기출을 무단 복제하지 않는다. 문제 은행은 자체 창작·라이선스 확보 후에만
- “official TOPIK”, “NIIED”, 로고 유사 사용 금지
- AI 첨삭은 공식 채점이 아님을 제출 화면에 명시
- 커뮤니티 UGC: 이용약관, 개인정보, 신고 플로우를 Phase 4 전에 준비
- 개인정보: 외국인 타깃이므로 Privacy Policy를 영어 먼저 작성

---

## 12. 구현 착수 시 체크리스트

계획이 확정되고 “구현해줘”가 오면 이 순서로 진행한다.

1. `create-next-app` (App Router, TS, Tailwind, App 디렉터리)
2. `src/lib/site.ts`에 브랜드·SEO 상수
3. 글로벌 레이아웃, 영문 카피, 비제휴 푸터
4. 홈 랜딩: 슬로건, 서비스 설명, 6개 목표 기능 소개
5. About, Legal 페이지
6. Favicon / OG 이미지
7. Metadata, canonical, JSON-LD 3종, sitemap, robots
8. README
9. GitHub 저장소 생성·푸시
10. Vercel 프로젝트 `topikcampus` 배포 → `https://topikcampus.vercel.app` 확인

---

## 13. 열린 결정 (구현 전에 확인하면 좋은 것)

요청에 1·2·8만 있어서 아래는 기본값을 잡아 두었다. 다르면 구현 전에 수정한다.

| 항목 | 계획상 기본값 |
|------|----------------|
| GitHub 저장소 공개 여부 | Public 가정, 확인 필요 |
| GitHub org/user | 구현 시 사용할 계정 확인 |
| 1차 범위 | 랜딩 + SEO + 배포만 (기능 앱은 이후) |
| i18n | **결정: 단일 커뮤니티 + `/{locale}` URL + DB 번역 + SSR.** 쿠키만으로 언어 전환하지 않음 |
| Auth/DB | Phase 1에는 없음. 이후 Supabase 우선 검토 |
| 디자인 톤 | 라이트 테마, 학습 서비스다운 신뢰감 (네이비/화이트 계열 가정) |
| 커스텀 도메인 | 1차는 vercel.app만, `topikcampus.com`은 DNS 준비 후 |

---

## 14. 한 줄 요약

**TOPIK Campus는 공식 기관과 무관한 글로벌 TOPIK 학습 커뮤니티이며, Next.js로 만들어 GitHub에 올리고 Vercel 프로젝트 `topikcampus`로 `topikcampus.vercel.app`에 배포한다. 커뮤니티는 하나이고, 언어는 `/{locale}` URL + DB 자동번역 + 서버 렌더로 나눈다.**
