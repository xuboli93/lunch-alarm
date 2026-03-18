<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍱 식수 인원 관리</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#FF6B35">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="식수관리">
</head>
<body>
    <!-- 알람 오버레이 -->
    <div id="alarmOverlay" class="alarm-overlay hidden">
        <div class="alarm-box">
            <div class="alarm-icon">🔔</div>
            <div class="alarm-title">식수 인원 입력 시간!</div>
            <div class="alarm-message">오늘 식수 인원을 입력해주세요.</div>
            <div class="alarm-time" id="alarmTime"></div>
            <button class="alarm-btn" onclick="closeAlarm()">확인</button>
        </div>
    </div>

    <!-- 알림 권한 요청 배너 -->
    <div id="notiBanner" class="noti-banner hidden">
        <div class="noti-banner-inner">
            <span class="noti-banner-icon">🔔</span>
            <div class="noti-banner-text">
                <strong>브라우저 알림이 꺼져 있어요!</strong>
                <span>알람을 받으려면 알림을 허용해 주세요.</span>
            </div>
            <button class="noti-allow-btn" onclick="requestPermission()">허용</button>
            <button class="noti-close-btn" onclick="closeBanner()"><i class="fas fa-times"></i></button>
        </div>
    </div>

    <!-- 저장 성공 토스트 -->
    <div id="toastMsg" class="toast hidden"></div>

    <div class="app-container">
        <!-- 헤더 -->
        <header class="app-header">
            <div class="header-left">
                <span class="header-icon">🍱</span>
                <div>
                    <h1 class="header-title">식수 인원 관리</h1>
                    <p class="header-sub" id="todayDateDisplay"></p>
                </div>
            </div>
            <div class="header-right">
                <button class="icon-btn" onclick="showAlarmSetting()" title="알람 설정">
                    <i class="fas fa-bell"></i>
                    <span class="alarm-badge" id="alarmBadge"></span>
                </button>
                <button class="icon-btn" onclick="showHistory()" title="기록 보기">
                    <i class="fas fa-history"></i>
                </button>
            </div>
        </header>

        <!-- 탭 네비게이션 -->
        <nav class="tab-nav">
            <button class="tab-btn active" onclick="switchTab('input', this)">
                <i class="fas fa-pencil-alt"></i> 오늘 입력
            </button>
            <button class="tab-btn" onclick="switchTab('history', this)">
                <i class="fas fa-list"></i> 기록
            </button>
            <button class="tab-btn" onclick="switchTab('alarm', this)">
                <i class="fas fa-clock"></i> 알람설정
            </button>
        </nav>

        <!-- 입력 탭 -->
        <section id="tabInput" class="tab-content active">
            <!-- 요약 카드 -->
            <div class="summary-card">
                <div class="summary-header">
                    <span>📊 오늘 예상 총 인원</span>
                    <span class="total-badge" id="liveTotal">0명</span>
                </div>
                <div class="team-summary-row">
                    <div class="team-chip" id="chipExecutives">
                        <span class="chip-icon">👔</span>
                        <span class="chip-label">이사/대표</span>
                        <span class="chip-count" id="countExecutives">0</span>
                    </div>
                    <div class="team-chip" id="chipOperations">
                        <span class="chip-icon">💼</span>
                        <span class="chip-label">운영컨설팅</span>
                        <span class="chip-count" id="countOperations">0</span>
                    </div>
                    <div class="team-chip" id="chipStrategy">
                        <span class="chip-icon">📈</span>
                        <span class="chip-label">경영전략</span>
                        <span class="chip-count" id="countStrategy">0</span>
                    </div>
                    <div class="team-chip" id="chipPurchasing">
                        <span class="chip-icon">🛒</span>
                        <span class="chip-label">구매팀</span>
                        <span class="chip-count" id="countPurchasing">0</span>
                    </div>
                    <div class="team-chip" id="chipCleaner">
                        <span class="chip-icon">🧹</span>
                        <span class="chip-label">청소이모님</span>
                        <span class="chip-count" id="countCleaner">0</span>
                    </div>
                </div>
            </div>

            <!-- 팀별 입력 카드들 -->
            <div class="input-section">
                <h2 class="section-title"><i class="fas fa-users"></i> 팀별 인원 입력</h2>

                <!-- 이사 및 대표님 -->
                <div class="team-card">
                    <div class="team-card-header">
                        <div class="team-info">
                            <span class="team-emoji">👔</span>
                            <div>
                                <div class="team-name">이사 및 대표님</div>
                                <div class="team-max">최대 4명</div>
                            </div>
                        </div>
                        <div class="counter-group">
                            <button class="counter-btn minus" onclick="changeCount('executives', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="executives" class="counter-input" value="0" min="0" max="4"
                                   onchange="updateCount('executives', this.value)">
                            <button class="counter-btn plus" onclick="changeCount('executives', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="member-dots" id="dotsExecutives">
                        <!-- dots generated by JS -->
                    </div>
                </div>

                <!-- 운영컨설팅팀 -->
                <div class="team-card">
                    <div class="team-card-header">
                        <div class="team-info">
                            <span class="team-emoji">💼</span>
                            <div>
                                <div class="team-name">운영컨설팅팀</div>
                                <div class="team-max">최대 8명</div>
                            </div>
                        </div>
                        <div class="counter-group">
                            <button class="counter-btn minus" onclick="changeCount('operations', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="operations" class="counter-input" value="0" min="0" max="8"
                                   onchange="updateCount('operations', this.value)">
                            <button class="counter-btn plus" onclick="changeCount('operations', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="member-dots" id="dotsOperations"></div>
                </div>

                <!-- 경영전략팀 -->
                <div class="team-card">
                    <div class="team-card-header">
                        <div class="team-info">
                            <span class="team-emoji">📈</span>
                            <div>
                                <div class="team-name">경영전략팀</div>
                                <div class="team-max">최대 6명</div>
                            </div>
                        </div>
                        <div class="counter-group">
                            <button class="counter-btn minus" onclick="changeCount('strategy', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="strategy" class="counter-input" value="0" min="0" max="6"
                                   onchange="updateCount('strategy', this.value)">
                            <button class="counter-btn plus" onclick="changeCount('strategy', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="member-dots" id="dotsStrategy"></div>
                </div>

                <!-- 구매팀 -->
                <div class="team-card">
                    <div class="team-card-header">
                        <div class="team-info">
                            <span class="team-emoji">🛒</span>
                            <div>
                                <div class="team-name">구매팀</div>
                                <div class="team-max">최대 3명</div>
                            </div>
                        </div>
                        <div class="counter-group">
                            <button class="counter-btn minus" onclick="changeCount('purchasing', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="purchasing" class="counter-input" value="0" min="0" max="3"
                                   onchange="updateCount('purchasing', this.value)">
                            <button class="counter-btn plus" onclick="changeCount('purchasing', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="member-dots" id="dotsPurchasing"></div>
                </div>

                <!-- 청소 이모님 -->
                <div class="team-card cleaner-card" id="cleanerCard">
                    <div class="team-card-header">
                        <div class="team-info">
                            <span class="team-emoji">🧹</span>
                            <div>
                                <div class="team-name">청소 이모님</div>
                                <div class="team-max" id="cleanerNote">월·목 1명 (오늘 해당 없음)</div>
                            </div>
                        </div>
                        <div class="counter-group">
                            <button class="counter-btn minus" onclick="changeCount('cleaner', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="cleaner" class="counter-input" value="0" min="0" max="1"
                                   onchange="updateCount('cleaner', this.value)">
                            <button class="counter-btn plus" onclick="changeCount('cleaner', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="member-dots" id="dotsCleaner"></div>
                </div>

                <!-- 메모 -->
                <div class="memo-card">
                    <label class="memo-label"><i class="fas fa-sticky-note"></i> 메모 (선택)</label>
                    <textarea id="memoInput" class="memo-input" placeholder="특이사항을 입력하세요..."></textarea>
                </div>

                <!-- 저장 버튼 -->
                <button class="save-btn" onclick="saveRecord()">
                    <i class="fas fa-save"></i> 오늘 인원 저장
                </button>

                <!-- 전체 초기화 -->
                <button class="reset-btn" onclick="resetAll()">
                    <i class="fas fa-undo"></i> 초기화
                </button>
            </div>
        </section>

        <!-- 기록 탭 -->
        <section id="tabHistory" class="tab-content hidden">
            <div class="history-section">
                <div class="history-header">
                    <h2 class="section-title"><i class="fas fa-list-alt"></i> 식수 인원 기록</h2>
                    <div class="history-actions">
                        <button class="small-btn" onclick="loadHistory()">
                            <i class="fas fa-sync-alt"></i> 새로고침
                        </button>
                    </div>
                </div>

                <!-- 통계 요약 -->
                <div class="stats-row" id="statsRow">
                    <div class="stat-box">
                        <div class="stat-num" id="statDays">-</div>
                        <div class="stat-label">기록 일수</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-num" id="statAvg">-</div>
                        <div class="stat-label">평균 인원</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-num" id="statMax">-</div>
                        <div class="stat-label">최대 인원</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-num" id="statMin">-</div>
                        <div class="stat-label">최소 인원</div>
                    </div>
                </div>

                <div id="historyList" class="history-list">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>저장된 기록이 없습니다.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 알람 설정 탭 -->
        <section id="tabAlarm" class="tab-content hidden">
            <div class="alarm-section">
                <h2 class="section-title"><i class="fas fa-bell"></i> 알람 설정</h2>

                <div class="alarm-card">
                    <div class="alarm-setting-row">
                        <div class="alarm-setting-info">
                            <div class="alarm-setting-title">식수 인원 입력 알람</div>
                            <div class="alarm-setting-sub">매일 설정한 시간에 알림을 드립니다</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="alarmToggle" onchange="toggleAlarm(this)">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="alarm-time-setting" id="alarmTimeSetting">
                        <label class="time-label">알람 시간</label>
                        <input type="time" id="alarmTimeInput" class="time-input" value="10:30">
                        <button class="apply-btn" onclick="applyAlarmTime()">
                            <i class="fas fa-check"></i> 적용
                        </button>
                    </div>

                    <div class="alarm-days">
                        <div class="days-label">알람 요일</div>
                        <div class="days-row">
                            <label class="day-chip"><input type="checkbox" value="0" class="day-check"> 일</label>
                            <label class="day-chip"><input type="checkbox" value="1" class="day-check" checked> 월</label>
                            <label class="day-chip"><input type="checkbox" value="2" class="day-check" checked> 화</label>
                            <label class="day-chip"><input type="checkbox" value="3" class="day-check" checked> 수</label>
                            <label class="day-chip"><input type="checkbox" value="4" class="day-check" checked> 목</label>
                            <label class="day-chip"><input type="checkbox" value="5" class="day-check" checked> 금</label>
                            <label class="day-chip"><input type="checkbox" value="6" class="day-check"> 토</label>
                        </div>
                    </div>
                </div>

                <!-- 알람 안내 -->
                <div class="alarm-info-card">
                    <h3><i class="fas fa-info-circle"></i> 알람 안내</h3>
                    <ul>
                        <li>브라우저를 열어 두어야 알람이 정상 작동합니다.</li>
                        <li>최초 설정 시 브라우저 알림 권한을 허용해 주세요.</li>
                        <li>청소 이모님은 <strong>월·목요일</strong>에 자동으로 1명 표시됩니다.</li>
                        <li>알람 시간에 브라우저 알림 + 화면 팝업이 표시됩니다.</li>
                    </ul>
                </div>

                <!-- 알림 권한 요청 버튼 -->
                <div id="notiPermissionBox" class="noti-permission-box hidden">
                    <div class="noti-permission-icon">🔔</div>
                    <div class="noti-permission-title">브라우저 알림 권한 필요</div>
                    <div class="noti-permission-desc">알람 기능을 사용하려면 브라우저 알림을 허용해야 합니다.</div>
                    <button class="noti-permission-btn" onclick="requestPermission()">
                        <i class="fas fa-bell"></i> 알림 허용하기
                    </button>
                    <div class="noti-permission-status" id="notiStatus"></div>
                </div>

                <!-- 테스트 알람 -->
                <button class="test-alarm-btn" onclick="testAlarm()">
                    <i class="fas fa-bell"></i> 알람 테스트
                </button>

                <!-- 알람 현황 -->
                <div class="alarm-status-card" id="alarmStatusCard">
                    <div class="alarm-status-row">
                        <span><i class="fas fa-circle" id="alarmStatusDot"></i> 알람 상태</span>
                        <span id="alarmStatusText" class="status-off">꺼짐</span>
                    </div>
                    <div class="alarm-status-row" id="nextAlarmRow" style="display:none">
                        <span><i class="fas fa-clock"></i> 다음 알람</span>
                        <span id="nextAlarmText">-</span>
                    </div>
                </div>
            </div>
        </section>

    </div>

    <script src="js/app.js"></script>
    <script>
        // Service Worker 등록
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.log('[SW] 등록 성공:', reg.scope);
                    // Background Sync 등록 (지원 브라우저)
                    if ('periodicSync' in reg) {
                        reg.periodicSync.register('check-alarm', { minInterval: 5 * 60 * 1000 })
                            .catch(e => console.log('[SW] periodicSync 미지원:', e));
                    }
                })
                .catch(err => console.log('[SW] 등록 실패:', err));
        }
    </script>
</body>
</html>
