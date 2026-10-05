import { useEffect } from "react";
import FlexCarousel from "./components/FlexCarousel/FlexCarousel";
import FlipCard from "./components/FlipCard/FlipCard";
import BlurText from "./components/BlurText/BlurText";
import ShinyText from "./components/ShinyText/ShinyText";
import GlareHover from "./components/GlareHover/GlareHover";
import ClickSpark from "./components/ClickSpark/ClickSpark";
import TearTicket from "./components/TearTicket/TearTicket";
import BorderGlow from "./components/BorderGlow/BorderGlow";
import DriftWall from "./components/DriftWall/DriftWall";
import { initSite } from "./legacy";

const PHOTOS = [
  { src: "/assets/couple-lake.jpg", alt: "Bên hồ", title: "By the lake" },
  { src: "/assets/couple-aodai.jpg", alt: "Áo dài", title: "Áo dài" },
  { src: "/assets/couple-walk.jpg", alt: "Dạo bước", title: "Hand in hand" },
  { src: "/assets/couple-formal.jpg", alt: "Trang trọng", title: "So formal" },
  { src: "/assets/couple-garden.jpg", alt: "Trong vườn", title: "In the garden" },
  { src: "/assets/hero-couple.jpg", alt: "Love story", title: "Love story" },
];

const HERO_PHOTOS = [
  { image: "/assets/hero-couple.jpg", title: "Đức Hùng & Phương Thảo" },
  { image: "/assets/couple-garden.jpg", title: "Trong vườn" },
  { image: "/assets/couple-lake.jpg", title: "Bên hồ" },
  { image: "/assets/couple-aodai.jpg", title: "Áo dài" },
  { image: "/assets/couple-walk.jpg", title: "Dạo bước" },
  { image: "/assets/couple-formal.jpg", title: "Trang trọng" },
];

export default function App() {
  useEffect(() => {
    initSite();
  }, []);

  return (
    <>

        {/* ===== SVG DECOR SYMBOLS (wedding ornaments) ===== */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <symbol id="deco-olive" viewBox="0 0 120 170">
              <path d="M60 166 C58 122, 63 72, 48 22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
              <g fill="currentColor" opacity="0.9">
                <ellipse cx="44" cy="142" rx="14" ry="5" transform="rotate(-35 44 142)"/>
                <ellipse cx="76" cy="130" rx="14" ry="5" transform="rotate(35 76 130)"/>
                <ellipse cx="46" cy="112" rx="13" ry="5" transform="rotate(-35 46 112)"/>
                <ellipse cx="74" cy="100" rx="13" ry="5" transform="rotate(35 74 100)"/>
                <ellipse cx="48" cy="82" rx="12" ry="4.6" transform="rotate(-35 48 82)"/>
                <ellipse cx="70" cy="70" rx="12" ry="4.6" transform="rotate(35 70 70)"/>
                <ellipse cx="50" cy="52" rx="11" ry="4.2" transform="rotate(-35 50 52)"/>
                <ellipse cx="62" cy="40" rx="10" ry="4" transform="rotate(30 62 40)"/>
                <ellipse cx="50" cy="24" rx="9" ry="3.8" transform="rotate(-22 50 24)"/>
              </g>
              <circle cx="52" cy="160" r="3.6" fill="currentColor"/>
              <circle cx="68" cy="156" r="3" fill="currentColor" opacity="0.75"/>
            </symbol>
            <symbol id="deco-flourish" viewBox="0 0 240 40">
              <path d="M8 22 Q55 12 100 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              <path d="M140 20 Q185 28 232 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              <circle cx="8" cy="22" r="2.2" fill="currentColor"/>
              <circle cx="232" cy="18" r="2.2" fill="currentColor"/>
              <path d="M120 10 c-2.2-3.6-8.6-3.8-10.4-0.4 c-1.6 3 0.6 6.8 5 9.8 c1.2-3.6 7-6.4 5.4-9.4 z" fill="currentColor"/>
            </symbol>
            <symbol id="deco-blossom" viewBox="0 0 48 48">
              <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
                <ellipse cx="24" cy="13" rx="5.5" ry="8"/>
                <ellipse cx="24" cy="13" rx="5.5" ry="8" transform="rotate(72 24 24)"/>
                <ellipse cx="24" cy="13" rx="5.5" ry="8" transform="rotate(144 24 24)"/>
                <ellipse cx="24" cy="13" rx="5.5" ry="8" transform="rotate(216 24 24)"/>
                <ellipse cx="24" cy="13" rx="5.5" ry="8" transform="rotate(288 24 24)"/>
                <circle cx="24" cy="24" r="3.2"/>
                <path d="M24 32 C24 38, 22 42, 18 45"/>
                <ellipse cx="20" cy="40" rx="4" ry="2" transform="rotate(-30 20 40)" stroke-width="1.4"/>
              </g>
            </symbol>
            <symbol id="deco-heart" viewBox="0 0 48 48">
              <path d="M24 40 C14 32, 8 26, 8 18 C8 12, 12 8, 17 8 C21 8, 23.5 10.5, 24 13 C24.5 10.5, 27 8, 31 8 C36 8, 40 12, 40 18 C40 26, 34 32, 24 40 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
            <symbol id="deco-tulip" viewBox="0 0 48 48">
              <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 6 C20 12, 18 18, 18 26 C18 32, 21 36, 24 38 C27 36, 30 32, 30 26 C30 18, 28 12, 24 6 Z"/>
                <path d="M18 14 C13 18, 11 24, 12 30 C16 28, 18 24, 18 20"/>
                <path d="M30 14 C35 18, 37 24, 36 30 C32 28, 30 24, 30 20"/>
                <path d="M24 38 L24 46"/>
              </g>
            </symbol>
            <symbol id="waveEdge" viewBox="0 0 500 60">
              <path d="M0 60 L0 38 C55 22, 115 50, 185 36 C255 22, 315 50, 385 36 C425 28, 465 36, 500 30 L500 60 Z" fill="currentColor"/>
            </symbol>
          </defs>
        </svg>
        {/* ===== COVER ===== */}
        <div className="cover" id="cover" aria-label="Bìa thiệp cưới">
          <canvas className="cover-petals" id="coverPetals" aria-hidden="true"></canvas>
          <div className="cover-frame">
            <div className="frame-corner tl" aria-hidden="true"></div>
            <div className="frame-corner tr" aria-hidden="true"></div>
            <div className="frame-corner bl" aria-hidden="true"></div>
            <div className="frame-corner br" aria-hidden="true"></div>

            <div className="cover-inner">
              <div className="cover-kicker">Thân mời bạn</div>
              <div className="cover-guest" id="coverGuest">Trường</div>
              <div className="cover-rule" aria-hidden="true"><span></span><i>♥</i><span></span></div>
              <div className="cover-lead">đến chung vui trong lễ thành hôn của</div>
              <div className="cover-names">
                <span>Đức Hùng</span>
                <em>&</em>
                <span>Phương Thảo</span>
              </div>
              <div className="cover-date">20 . 10 . 2026</div>
              <button className="btn-open glass-btn" id="btnOpen" type="button">
                <span className="btn-open-ring" aria-hidden="true"></span>
                <span className="btn-open-label">Mở thiệp cưới</span>
              </button>
              <div className="cover-hint">Nhấn để mở thiệp</div>
            </div>
          </div>
        </div>
        {/* ===== CARD SHELL (max 500px, centered) ===== */}
        <div className="card-shell" id="cardShell" hidden>
          <canvas id="sparkles" aria-hidden="true"></canvas>

          {/* HERO */}
          <header className="hero">
            <div className="hero-drift" aria-hidden="true">
              <DriftWall
                items={HERO_PHOTOS}
                columns={4}
                tileWidth={150}
                tileHeight={100}
                gap={12}
                radius={10}
                speed={36}
                dim={0.5}
                fade={0.55}
                overlayColor="rgba(40,50,25,0.55)"
              />
            </div>
            <div className="hero-brand" aria-hidden="true">LOVE STORY</div>
            <svg className="float-heart h1" aria-hidden="true"><use href="#deco-heart"/></svg>
            <svg className="float-heart h2" aria-hidden="true"><use href="#deco-heart"/></svg>
            <svg className="float-heart h3" aria-hidden="true"><use href="#deco-heart"/></svg>
            <div className="hero-content">
              <div className="hero-kicker">The Wedding Of</div>
              <h1 className="hero-names">
                <ShinyText text="Đức Hùng & Phương Thảo" speed={3} color="#caa96a" shineColor="#fffdf4" />
              </h1>
              <div className="hero-date">19 — 20 . 10 . 2026</div>
              <div className="scroll-hint" aria-hidden="true"><span></span></div>
            </div>
          </header>

          {/* SAVE THE DATE */}
          <section className="section cream">
            <div className="section-head reveal">
              <BlurText text="Save the Date" className="en" delay={120} animateBy="words" />
            </div>

            <div className="collage reveal">
              <svg className="deco right collage-deco" aria-hidden="true"><use href="#deco-olive"/></svg>
              <div className="std-flip-holder">
                <FlipCard
                  width={300}
                  height={440}
                  radius={20}
                  background="transparent"
                  color="#3d4a28"
                  tiltMax={8}
                  ariaLabel="Thẻ Save the Date — chạm để lật xem chi tiết"
                  front={
                    <div className="std-face std-front">
                      <div className="std-mono">H &amp; T</div>
                      <div className="std-title">Save the Date</div>
                      <div className="std-date">20.10.2026</div>
                      <div className="std-names">Hùng &amp; Thảo</div>
                      <div className="std-cta">Chạm để lật ⟶</div>
                    </div>
                  }
                  back={
                    <div className="std-face std-back">
                      <div className="std-eyebrow">Trân trọng kính mời</div>
                      <p className="std-note">
                        Cùng chúng mình đánh dấu
                        <br />
                        ngày hạnh phúc nhất
                      </p>
                      <div className="std-date">20 . 10 . 2026</div>
                      <div className="std-names-sm">Đức Hùng &amp; Phương Thảo</div>
                      <div className="std-cta">⟵ Chạm để lật lại</div>
                    </div>
                  }
                />
              </div>
              <div className="polaroid-stack">
                <figure className="polaroid tilt-l reveal">
                  <GlareHover width="100%" height="auto" background="transparent" borderColor="transparent" borderRadius="2px" glareColor="#ffffff" glareOpacity={0.35} glareSize={200}><img src="/assets/couple-garden.jpg" alt="Khoảnh khắc hạnh phúc" loading="lazy" /></GlareHover>
                </figure>
                <figure className="polaroid tilt-r reveal">
                  <GlareHover width="100%" height="auto" background="transparent" borderColor="transparent" borderRadius="2px" glareColor="#ffffff" glareOpacity={0.35} glareSize={200}><img src="/assets/couple-lake.jpg" alt="Bên hồ" loading="lazy" /></GlareHover>
                </figure>
                <figure className="polaroid tilt-l2 reveal">
                  <GlareHover width="100%" height="auto" background="transparent" borderColor="transparent" borderRadius="2px" glareColor="#ffffff" glareOpacity={0.35} glareSize={200}><img src="/assets/couple-walk.jpg" alt="Dạo bước" loading="lazy" /></GlareHover>
                </figure>
              </div>
            </div>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-cream-olive" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>

          {/* STORY */}
          <section className="section olive">
            <svg className="deco left" aria-hidden="true"><use href="#deco-olive"/></svg>
            <div className="section-head light reveal">
              <BlurText text="Our Story" className="en" delay={120} animateBy="words" />
            </div>
            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>
            <div className="story-text reveal">
              <p>
                Chúng mình ở đây, với một niềm vui rất lớn muốn được chia sẻ cùng bạn. Sau những ngày tháng
                yêu thương, thấu hiểu và đồng hành, chúng mình quyết định cùng nhau bước sang một chặng
                đường mới — chặng đường của gia đình, của sự gắn bó và yêu thương dài lâu.
              </p>
              <p>
                Rất mong bạn sẽ đến chung vui, cùng chứng kiến khoảnh khắc đặc biệt này và gửi đến chúng
                mình những lời chúc phúc thật đẹp.
              </p>
            </div>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-olive-cream" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>
          {/* CALENDAR + WELCOME + ENGAGEMENT */}
          <section className="section cream">
            <div className="calendar-card reveal" id="calTarget">
              <div className="cal-head">
                <button className="cal-nav glass-btn" id="calPrev" type="button" aria-label="Tháng trước">‹</button>
                <h3 id="calTitle">Tháng 10, 2026</h3>
                <button className="cal-nav glass-btn" id="calNext" type="button" aria-label="Tháng sau">›</button>
              </div>
              <div className="cal-grid" id="calGrid"></div>
            </div>

            <div className="welcome reveal">
              <div className="welcome-en">Welcome to our wedding</div>
              <div className="welcome-name">Đức Hùng</div>
              <div className="welcome-amp">&</div>
              <div className="welcome-name">Phương Thảo</div>
            </div>

            <div className="event-card spot reveal">
              <h3>Lễ Ăn Hỏi</h3>
              <div className="event-row">
                <span className="side">08 GIỜ 00</span>
                <span className="big">19</span>
                <span className="side">THÁNG 10</span>
              </div>
              <div className="event-year">2026</div>
              <div className="event-place">Tại tư gia nhà gái</div>
              <div className="event-addr">
                Địa chỉ: Khu 15 Đông Phong, Quảng Oai, Ba Vì, Hà Nội<br />
                (Tức ngày 10 tháng 9 năm Bính Ngọ)
              </div>
              <a
                className="btn-pill glass-btn"
                href="https://www.google.com/maps/search/?api=1&query=Khu+15+%C4%90%C3%B4ng+Phong+Qu%E1%BA%A3ng+Oai+Ba+V%C3%AC+H%C3%A0+N%E1%BB%99i"
                target="_blank"
                rel="noopener noreferrer"
                >Chỉ đường</a
              >
            </div>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-cream-olive" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>

          {/* COUNTDOWN */}
          <section className="section olive">
            <svg className="deco right" aria-hidden="true"><use href="#deco-olive"/></svg>
            <div className="countdown-cap reveal">Đếm ngược đến ngày chúng mình chung đôi!</div>
            <div className="countdown reveal" id="countdown">
              <BorderGlow colors={['#e8d48b', '#b3985a', '#f6e7b2']} borderRadius={14} glowRadius={24} backgroundColor="transparent" glowColor="45 90 70"><div className="cd-cell glass-dark"><div className="cd-num" id="cdDays">00</div><div className="cd-label">Ngày</div></div></BorderGlow>
              <BorderGlow colors={['#e8d48b', '#b3985a', '#f6e7b2']} borderRadius={14} glowRadius={24} backgroundColor="transparent" glowColor="45 90 70"><div className="cd-cell glass-dark"><div className="cd-num" id="cdHours">00</div><div className="cd-label">Giờ</div></div></BorderGlow>
              <BorderGlow colors={['#e8d48b', '#b3985a', '#f6e7b2']} borderRadius={14} glowRadius={24} backgroundColor="transparent" glowColor="45 90 70"><div className="cd-cell glass-dark"><div className="cd-num" id="cdMins">00</div><div className="cd-label">Phút</div></div></BorderGlow>
              <BorderGlow colors={['#e8d48b', '#b3985a', '#f6e7b2']} borderRadius={14} glowRadius={24} backgroundColor="transparent" glowColor="45 90 70"><div className="cd-cell glass-dark"><div className="cd-num" id="cdSecs">00</div><div className="cd-label">Giây</div></div></BorderGlow>
            </div>
            <figure className="hero-photo reveal">
              <img src="/assets/couple-garden.jpg" alt="Khoảnh khắc bên nhau" loading="lazy" />
            </figure>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-olive-cream" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>

          {/* GALLERY — ReactBits FlexCarousel */}
          <section className="section cream">
            <div className="section-head reveal">
              <BlurText text="Our Moments" className="en" delay={120} animateBy="words" />
              <p className="lead">Những khoảnh khắc đẹp nhất trong hành trình yêu thương.</p>
            </div>
            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>

            {/* GALLERY — ReactBits FlexCarousel */}
            <div className="flexc-holder">
              <FlexCarousel
                items={PHOTOS}
                preset="liquid"
                intro="rise"
                cardHeight={0.55}
                gap={10}
                radius={14}
                captions={true}
                autoplay={true}
                interval={4}
                captureWheel={false}
              />
            </div>
            <p className="flexc-hint">Chạm để phóng to · Kéo để xem ♥</p>
          </section>
          {/* ===== OUR WEDDING DAY (timeline like sample) ===== */}
          <section className="section cream wedding-day">
            <div className="section-head reveal">
              <BlurText text="Our Wedding Day" className="en" delay={120} animateBy="words" />
              <div className="script">Wedding Invitation</div>
            </div>
            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>

            <div className="day-frame reveal">
              <svg className="corner-blossom tl" aria-hidden="true"><use href="#deco-blossom"/></svg>
              <svg className="corner-blossom tr" aria-hidden="true"><use href="#deco-blossom"/></svg>
              <svg className="corner-blossom bl" aria-hidden="true"><use href="#deco-blossom"/></svg>
              <svg className="corner-blossom br" aria-hidden="true"><use href="#deco-blossom"/></svg>
              <div className="day-timeline">
              <div className="day-line" aria-hidden="true"></div>

              {/* left icon / right card */}
              <div className="day-item">
                <div className="day-side left">
                  <div className="day-icon" aria-hidden="true">💍</div>
                </div>
                <div className="day-connector" aria-hidden="true"><i></i><span></span></div>
                <div className="day-side right">
                  <div className="day-card">
                    <div className="day-date">19/10/2026</div>
                    <div className="day-name">Lễ Ăn Hỏi</div>
                  </div>
                </div>
              </div>

              {/* left card / right icon */}
              <div className="day-item">
                <div className="day-side left">
                  <div className="day-card">
                    <div className="day-date">20/10/2026</div>
                    <div className="day-name">Lễ Thành Hôn</div>
                  </div>
                </div>
                <div className="day-connector" aria-hidden="true"><i></i><span></span></div>
                <div className="day-side right">
                  <div className="day-icon" aria-hidden="true">📷</div>
                </div>
              </div>

              {/* left icon / right card */}
              <div className="day-item">
                <div className="day-side left">
                  <div className="day-icon" aria-hidden="true">🥂</div>
                </div>
                <div className="day-connector" aria-hidden="true"><i></i><span></span></div>
                <div className="day-side right">
                  <div className="day-card">
                    <div className="day-date">20/10/2026</div>
                    <div className="day-name">Bữa Tiệc Thân Mật</div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <svg className="deco left low" aria-hidden="true"><use href="#deco-olive"/></svg>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-cream-olive" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>

          {/* PARTY BANNER */}
          <section className="section olive">
            <svg className="deco right" aria-hidden="true"><use href="#deco-olive"/></svg>
            <div className="event-card on-olive reveal">
              <h3>Bữa tiệc thân mật</h3>
              <div className="event-row">
                <span className="side">10H00</span>
                <span className="big">20</span>
                <span className="side">THÁNG 10</span>
              </div>
              <div className="event-year">2026</div>
              <div className="event-place">Tại tư gia nhà trai</div>
              <div className="event-addr">Đ/c: Khu 11 Bản Nguyên, Lâm Thao, Phú Thọ</div>
              <a
                className="btn-pill light glass-btn"
                href="https://www.google.com/maps/search/?api=1&query=Khu+11+B%E1%BA%A3n+Nguy%C3%AAn+L%C3%A2m+Thao+Ph%C3%BA+Th%E1%BB%8D"
                target="_blank"
                rel="noopener noreferrer"
                >Chỉ đường</a
              >
            </div>
          </section>
        {/* wave divider (seamless: same CSS vars as adjoining sections) */}
        <div className="wdiv wv-olive-cream" aria-hidden="true"><svg viewBox="0 0 500 60" preserveAspectRatio="none"><use href="#waveEdge"/></svg></div>

          {/* ===== ĐẠI DIỆN GIA ĐÌNH (like sample) ===== */}
          <section className="section cream family-section">
            <div className="family-mask reveal" aria-hidden="true"></div>
            <div className="section-head reveal">
              <div className="en script family-title">Đại diện gia đình</div>
            </div>

            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>

            <div className="family-grid">
              <div className="family-side reveal">
                <h4>Nhà trai</h4>
                <div className="person">
                  Ông: Nguyễn Đức Quân<br />
                  Bà: Nguyễn Thị Kim Dung
                </div>
                <div className="addr">Khu 11 Bản Nguyên<br />Lâm Thao - Phú Thọ</div>
                <a
                  className="btn-pill glass-btn"
                  href="https://www.google.com/maps/search/?api=1&query=Khu+11+B%E1%BA%A3n+Nguy%C3%AAn+L%C3%A2m+Thao+Ph%C3%BA+Th%E1%BB%8D"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Địa chỉ</a
                >
              </div>
              <div className="family-side reveal">
                <h4>Nhà gái</h4>
                <div className="person">
                  Ông: Nguyễn Quang Sơn<br />
                  Bà: Phùng Thị Minh Hồng
                </div>
                <div className="addr">Khu 15 Đông Phong<br />Quảng Oai - Ba Vì - Hà Nội</div>
                <a
                  className="btn-pill glass-btn"
                  href="https://www.google.com/maps/search/?api=1&query=Khu+15+%C4%90%C3%B4ng+Phong+Qu%E1%BA%A3ng+Oai+Ba+V%C3%AC"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Địa chỉ</a
                >
              </div>
            </div>

            <div className="invite-note reveal">
              Sự hiện diện của quý khách<br />
              là niềm vinh hạnh cho gia đình chúng tôi!
              <span>Kính mời!</span>
            </div>
          </section>

          {/* MUSIC + THANKS */}
          <section className="section cream music">
            <svg className="deco right" aria-hidden="true"><use href="#deco-olive"/></svg>
            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>
            <div className="vinyl reveal" id="vinyl">
              <img src="/assets/couple-garden.jpg" alt="Bìa nhạc" loading="lazy" />
            </div>
            <div className="track-name reveal">Váy Cưới</div>
            <div className="eq-wrap reveal"><span className="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>
            <div className="player reveal">
              <button className="pc glass-btn" id="btnPrev" type="button" aria-label="Trước">⏮</button>
              <button className="pc play glass-btn" id="btnPlay" type="button" aria-label="Phát nhạc">
                <svg id="iconPlay" viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                <svg id="iconPause" viewBox="0 0 24 24" width="26" height="26" style={{ display: "none" }}><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
              </button>
              <button className="pc glass-btn" id="btnNext" type="button" aria-label="Tiếp">⏭</button>
            </div>
            <div className="progress" aria-hidden="true"><div className="bar" id="progressBar"></div></div>

            <div className="thanks reveal">
              <h3>Cảm ơn bạn rất nhiều! ❤</h3>
              <p>
                Cảm ơn vì đã dành thời gian để chung vui cùng tụi mình.<br />
                Mong rằng chúng ta sẽ còn đồng hành cùng nhau trong thật nhiều cột mốc hạnh phúc phía trước.
              </p>
            </div>
          </section>

          {/* GIFT — MỪNG CƯỚI */}
          <section className="section cream gift-section">
            <div className="section-head reveal">
              <div className="en"><BlurText text="Mừng Cưới" delay={120} animateBy="words" /></div>
              <p className="lead">Sự hiện diện của bạn là món quà quý giá nhất.</p>
            </div>
            <div className="sec-orn reveal" aria-hidden="true"><span></span><svg><use href="#deco-blossom"/></svg><span></span></div>
            <div className="gift-wrap reveal">
              <TearTicket
                width={340}
                height={220}
                stubSize={120}
                background="#fffdf6"
                color="#3d4a28"
                borderColor="rgba(179,152,90,0.6)"
                ariaLabel="Vé mừng cưới — kéo để xé cuống vé"
                stub={
                  <div className="gift-stub">
                    <div className="gift-eyebrow">Mừng Cưới</div>
                    <div className="gift-names-sm">Đức Hùng<br />&amp; Phương Thảo</div>
                    <div className="gift-date-sm">20 . 10 . 2026</div>
                    <div className="gift-tear-hint">Kéo để xé ⟶</div>
                  </div>
                }
              >
                <div className="gift-ticket-main">
                  <div className="qr-placeholder qr-main">
                    <span>Mã QR</span>
                    <small>Gửi ảnh QR cho mình để hoàn thiện</small>
                  </div>
                  <div className="gift-scan">Quét mã để gửi mừng cưới</div>
                </div>
              </TearTicket>
            </div>
            <p className="gift-note reveal">Quét mã QR để gửi lời chúc mừng tới cô dâu chú rể</p>
          </section>

          <footer className="footer">
            <svg className="deco-divider" aria-hidden="true"><use href="#deco-flourish"/></svg>
            Made with <span>♥</span> — Đức Hùng & Phương Thảo · 2026
          </footer>
        </div>
        {/* Floating wishes (glass) */}
        <div className="wish-float" id="wishFloat" aria-live="polite"></div>

        {/* Bottom bar (glass) */}
        <div className="bottom-bar" id="bottomBar">
          <form className="wish-input glass" id="wishForm">
            <input
              type="text"
              id="wishText"
              maxLength="120"
              placeholder="Gửi lời chúc..."
              autoComplete="off"
              aria-label="Nhập lời chúc"
            />
            <button className="wish-send glass-btn" type="submit" aria-label="Gửi lời chúc">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
          <button className="icon-btn glass-btn" id="btnWishList" type="button" aria-label="Xem lời chúc">💬</button>
          <ClickSpark sparkColor="#e8d48b" sparkCount={12} sparkRadius={24}>
          <button className="icon-btn glass-btn" id="btnLike" type="button" aria-label="Thả tim">
            ♥
            <span className="like-count" id="likeCount">14</span>
          </button>
          </ClickSpark>
        </div>

        {/* Wish panel */}
        <div className="wish-panel" id="wishPanel" role="dialog" aria-modal="true" aria-label="Danh sách lời chúc">
          <div className="wish-sheet glass">
            <button className="wish-close glass-btn" id="wishPanelClose" type="button" aria-label="Đóng">×</button>
            <h3>Lời chúc hạnh phúc</h3>
            <div className="wish-list" id="wishList"></div>
          </div>
        </div>

        {/* Link builder */}
        <div className="link-builder" id="linkBuilder">
          <button className="link-toggle glass-btn" id="linkToggle" type="button" title="Tạo link mời khách">🔗</button>
          <div className="link-panel glass" id="linkPanel">
            <h4>Tạo link mời khách</h4>
            <input type="text" id="linkGuestName" placeholder="Tên khách mời, ví dụ: Trường" />
            <button type="button" id="btnMakeLink">Tạo link</button>
            <input type="text" id="linkOutput" readOnly placeholder="Link sẽ hiện ở đây" />
            <button type="button" id="btnCopyLink">Sao chép link</button>
          </div>
        </div>

        {/* Lightbox (kept for compatibility; gallery now uses FlexCarousel focus) */}
        <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh lớn" aria-hidden="true">
          <div className="lb-frame">
            <img className="lb-img" src="" alt="" />
            <div className="lb-meta">
              <div className="lb-cap"></div>
              <div className="lb-counter"></div>
            </div>
          </div>
          <button className="lb-btn lb-close" type="button" aria-label="Đóng">×</button>
          <button className="lb-btn lb-prev" type="button" aria-label="Ảnh trước">‹</button>
          <button className="lb-btn lb-next" type="button" aria-label="Ảnh sau">›</button>
        </div>
    </>
  );
}
