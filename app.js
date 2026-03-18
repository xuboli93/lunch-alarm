name: 🍱 식수 인원 알림

on:
  schedule:
    # 매일 오전 10:30 (한국시간 = UTC+9, 즉 UTC 01:30)
    - cron: '30 1 * * 1-5'  # 월~금 오전 10:30 KST
  workflow_dispatch:  # 수동 실행 버튼

jobs:
  send-alarm:
    runs-on: ubuntu-latest

    steps:
      - name: 🔔 식수 인원 알림 신호 전송
        run: |
          curl -X POST "${{ secrets.APP_API_URL }}/tables/alarm_signal" \
            -H "Content-Type: application/json" \
            -d '{
              "signal": "ring",
              "message": "식수 인원을 입력해주세요!",
              "triggered_at": "'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"
            }'
          echo "✅ 알림 신호 전송 완료: $(date)"
