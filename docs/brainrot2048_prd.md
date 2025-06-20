# 제품 요구사항 문서(PRD) – “Brainrot 2048” 모바일 앱

## 1. Executive Summary

“Brainrot 2048”은 인기 퍼즐 게임 2048의 규칙을 기반으로, Brainrot 캐릭터·세계관·음성을 접목한 캐주얼 모바일 게임이다. 사용자는 숫자 대신 캐릭터 타일을 합쳐 더 높은 레벨을 만들고, 합쳐질 때마다 전용 음성과 애니메이션을 경험한다. 목표는 팬에게 차별화된 몰입감과 수집 요소를 제공하여 장기 사용·수익화를 달성하는 것이다.

## 2. Problem Statement

- 2048 팬덤은 많지만 IP(지적재산)와 결합된 고품질 버전은 드물다.
- Brainrot 팬들은 캐릭터 기반 게임이 부족해 브랜드 몰입 경험이 한정적이다.
- 퍼즐·모바일 시장은 경쟁이 치열하나, IP·음성·수집 요소로 차별화하면 틈새를 공략할 수 있다.

## 3. Goals and Objectives

- Primary Goal: Brainrot 세계관 팬 유입 및 2048 게임 재해석으로 신규 유저 확보
- Secondary Goals
  - 팬덤 충성도 강화(일일 재방문 25% 이상)
  - 광고·인앱 결제 월 매출 30K USD 달성
  - 앱 평점 4.5/5 유지
- Success Metrics
  - D1/D7/D30 Retention: 35% / 15% / 7%
  - 평균 세션 6분, 일일 세션 3회
  - IAP 전환율 3% 이상, ARPDAU 0.12 USD
  - 버그 리포트 <0.2% DAU

## 4. Target Audience

### Primary Users

- 15–35세 Brainrot 팬, 캐릭터 및 음성 수집 욕구
- 캐주얼 퍼즐·2048 경험자, 짧은 플레이 선호

### Secondary Users

- 캐릭터 음성 팬, 성우 팬덤
- 광고주·콜라보 파트너

## 5. User Stories

- “Brainrot 팬으로서 캐릭터를 합치며 성장시키고 음성을 듣고 싶다.”
- “캐주얼 게이머로서 출퇴근 중 3분 내 쉽게 플레이·중단하고 싶다.”
- “게임에서 죽었을 때 동영상 광고를 보고 한 번 더 기회를 얻고, 내가 선택한 타일의 캐릭터에 따라 다양한 타일 제거 효과(예: X자, H자 등)로 판을 정리하고 싶다.”

## 6. Functional Requirements

### Core Features

1. 2048 퍼즐 로직
   - Acceptance: 스와이프 네 방향, 동일 레벨 타일 합치기, 최고 레벨 도달 시 승리 팝업.
2. 캐릭터 음성·애니메이션
   - 타일 합칠 때 해당 레벨 전용 음성 재생(<1.5s), 진동 피드백.
   - 설정에서 음성·진동 on/off.
3. 점수 & 저장
   - 최고 점수는 로컬(기기 내) 저장만 지원.
   - 게임 진행 자동 저장 후 재개.

### Supporting Features

- 광고 리워드:
  - 게임 오버 시 동영상 광고 시청 시 한 번 더 기회 제공
    - 광고 시청 후, 사용자가 원하는 타일 1개를 선택
    - 선택된 타일의 캐릭터 종류에 따라 다른 타일 제거 효과가 적용됨
      - 예시:
        - A 캐릭터: 선택된 타일을 중심으로 X자 형태로 타일 삭제
        - B 캐릭터: 선택된 타일을 중심으로 H자 형태로 타일 삭제
        - C 캐릭터: 선택된 타일의 가로줄 전체 삭제
        - D 캐릭터: 선택된 타일의 세로줄 전체 삭제
      - 각 캐릭터별 제거 효과는 기획에 따라 정의
    - 제거 효과 연출 후 게임이 계속 진행됨
- 사운드·뮤트/볼륨 컨트롤

## 7. Non-Functional Requirements

- Performance: 60FPS, 로딩 <3s, APK ≤150 MB
- Security: HTTPS, 사용자 ID 토큰 암호화, 무결성 체크
- Usability: WCAG 2.1 준수, 튜토리얼 1분 이하
- Scalability: 동시 접속 100K, 랭킹 API 캐싱
- Compatibility: iOS 13+/Android 8+, 태블릿 대응

## 8. Technical Considerations

- Flutter로 단일 코드베이스(iOS/Android)
- State 관리: Riverpod, Flame 엔진 사용
- 백엔드: Firebase Auth, Firestore, Functions
- Analytics: Firebase Analytics, Crashlytics
- 보이스·애니메 자산 CDN(Cloud Storage)
- 타사 연동: AdMob, IAP, Game Service

## 9. Success Metrics and KPIs

- 기술: Crash-free 99.3%, ANR <0.1%
- 사용자: MAU 500K, 신규/재방문 60/40
- 사업: 광고 eCPM >8 USD, 평균 IAP 4 USD/유저
- 커뮤니티: SNS 언급 5K/월, 리뷰 4.5점 유지

## 10. Timeline and Milestones

- Phase 0 (2주): 기획·아트 콘셉트 확정, MVP 스펙 동결
- Phase 1 – MVP (8주): 퍼즐 로직, 기본 음성, 광고 리워드, 테스트플라이트/클로즈드 베타
- Phase 2 – 글로벌 런치 (4주): 스토어 로컬라이즈, 리더보드, 마케팅 사전등록
- Phase 3 – Live Ops (분기별): 신규 음성팩, 협업 컬래버, 플랫폼 피처드 대응

## 11. Risks and Mitigation

- IP 라이선스 지연 → 법무·아트 일정 버퍼 2주 확보
- 음성 용량 과다 → OGG 고압축, 스트리밍 로드
- 반복성으로 이탈 → 주간 챌린지·이벤트 지속 제공
- Flutter 성능 이슈 → Flame 엔진·네이티브 플러그인 테스트

## 12. Future Considerations

- PVP 모드(동시 플레이), 시즌 패스
- WebGL 버전으로 PC·웹 확장
- NFT 기반 한정 스킨(시장 상황 고려)
- AR 카메라에 캐릭터 소환 기능
- AI 음성 합성으로 다국어 더빙 비용 절감
