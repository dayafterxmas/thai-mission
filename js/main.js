(function () {
  "use strict";

  /* ── 오픈채팅 버튼: 주소가 있을 때만 나타남 ── */
  var cfg = window.SITE_CONFIG || {};
  var chatUrl = (cfg.openChatUrl || "").trim();
  var chatBtn = document.getElementById("open-chat");
  if (chatBtn && /^https?:\/\//i.test(chatUrl)) {
    chatBtn.href = chatUrl;
    chatBtn.hidden = false;
  }

  /* ── 안내 문구 ── */
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ── 계좌번호 복사 (계좌번호만 복사) ── */
  var numEl = document.getElementById("acct-num");
  var copyBtn = document.getElementById("copy-acct");

  function selectNumber() {
    if (!numEl) return;
    var range = document.createRange();
    range.selectNodeContents(numEl);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  if (copyBtn && numEl) {
    copyBtn.addEventListener("click", function () {
      var text = numEl.textContent.trim();
      copyText(text).then(function (ok) {
        if (ok) {
          toast("계좌번호를 복사했어요");
        } else {
          selectNumber(); // 복사 실패 시 번호를 선택해 두어 길게 눌러 복사할 수 있게 함
          toast("복사가 안 되었어요. 선택된 번호를 길게 눌러 복사해 주세요");
        }
      });
    });
  }

  /* ── 카카오톡 공유: 카드 아래 버튼 2개(기도·재정) ── */
  var shareBtn = document.getElementById("kakao-share");
  var SITE = "https://thai-mission.web.app/";
  function fallbackShare() {
    if (navigator.share) {
      navigator.share({ title: "Thailand, YOU ARE LOVED", url: SITE }).catch(function () {});
      return;
    }
    copyText(SITE).then(function (ok) { toast(ok ? "링크를 복사했어요" : "공유를 열 수 없어요. 주소창의 링크를 복사해 주세요"); });
  }
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var key = (cfg.kakaoJsKey || "").trim();
      try {
        if (!key || !window.Kakao) throw new Error("no-sdk");
        if (!window.Kakao.isInitialized()) window.Kakao.init(key);
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "Thailand, YOU ARE LOVED",
            description: "태국 치앙마이 동계 단기선교에 초대합니다. 기도와 후원으로 함께해 주세요.",
            imageUrl: SITE + "images/og-image.jpg",
            imageWidth: 1200,
            imageHeight: 630,
            link: { mobileWebUrl: SITE, webUrl: SITE }
          },
          buttons: [
            { title: "기도로 함께하기", link: { mobileWebUrl: SITE + "#pray-support", webUrl: SITE + "#pray-support" } },
            { title: "재정으로 함께하기", link: { mobileWebUrl: SITE + "#finance-support", webUrl: SITE + "#finance-support" } }
          ]
        });
      } catch (e) {
        fallbackShare();
      }
    });
  }

  /* ── 하단 이동 바: 현재 구역 강조 ── */
  var links = document.querySelectorAll(".dock a[data-sec]");
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("data-sec")] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("active"); });
          var a = map[e.target.id];
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
