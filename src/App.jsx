import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Star,
  Sun,
  Moon,
  Coffee,
  Music,
  Camera,
  Wind,
  Umbrella,
  Smile,
  CloudRain,
  Bike,
  Video,
  Play,
  ChevronDown,
  Gift,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Eye,
  Cat,
  Sunset,
  Sunrise,
  Flame,
  Feather,
  Leaf,
  X,
} from "lucide-react";

const slides = [
  { id: "intro", type: "video-hero" },
  { id: "birthday", type: "birthday-title" },
  { id: "little-him", type: "childhood-grid" },
  { id: "before-glow-up", type: "skinny-grid" },
  { id: "muscle-bunny", type: "muscle-slider" },
  { id: "rain-walk", type: "video-moment" },
  { id: "my-smile", type: "photo-text" },
  { id: "video-call", type: "gallery", category: "video-calls" },
  { id: "bike-rides", type: "gallery", category: "bikes" },
  { id: "goofing", type: "video-moment-2" },
  { id: "without-you", type: "sad-reveal" },
  { id: "main-character", type: "main-character" },
  { id: "our-story", type: "timeline" },
  { id: "more-moments", type: "gallery-full" },
  { id: "eyes", type: "eyes" },
  { id: "letter", type: "letter" },
  { id: "honey", type: "honey" },
  { id: "final", type: "final" },
];

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

export default function BirthdayWebsite() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("down");
  const [animating, setAnimating] = useState(false);
  const [riddleAnswered, setRiddleAnswered] = useState(false);
  const [riddle2Answered, setRiddle2Answered] = useState(false);
  const [sadRevealed, setSadRevealed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [video2Playing, setVideo2Playing] = useState(false);
  const [thanked, setThanked] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent =
      fonts +
      `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #f5f0e8; }
      :root {
        --cream: #f5f0e8;
        --offwhite: #faf8f4;
        --warm: #ede8dc;
        --sand: #d4c9b0;
        --stone: #8c7b6b;
        --deep: #3d2f25;
        --accent: #b8976a;
        --soft: #c9b99a;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setDirection(idx > current ? "down" : "up");
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  };

  const next = () => goTo(Math.min(current + 1, slides.length - 1));
  const prev = () => goTo(Math.max(current - 1, 0));

  const slide = slides[current];

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "var(--cream)",
        minHeight: "100dvh",
        overflow: "hidden",
        position: "relative",
        color: "var(--deep)",
        userSelect: "none",
      }}
    >
      {/* Ambient background texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(ellipse at 20% 20%, rgba(212,201,176,0.3) 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 80%, rgba(184,151,106,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Navigation dots */}
      <div
        style={{
          position: "fixed",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 100,
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 8 : 5,
              height: i === current ? 8 : 5,
              borderRadius: "50%",
              background: i === current ? "var(--accent)" : "var(--sand)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Slide container */}
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
          transform: animating
            ? direction === "down"
              ? "translateY(-40px)"
              : "translateY(40px)"
            : "translateY(0)",
          opacity: animating ? 0 : 1,
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {slide.type === "video-hero" && <VideoHero onNext={next} />}
        {slide.type === "birthday-title" && (
          <BirthdayTitle
            onNext={next}
            thanked={thanked}
            setThanked={setThanked}
          />
        )}
        {slide.type === "childhood-grid" && <ChildhoodGrid onNext={next} />}
        {slide.type === "skinny-grid" && <SkinnyGrid onNext={next} />}
        {slide.type === "muscle-slider" && <MuscleSlider onNext={next} />}
        {slide.type === "video-moment" && (
          <RainWalk
            playing={videoPlaying}
            setPlaying={setVideoPlaying}
            onNext={next}
          />
        )}
        {slide.type === "photo-text" && <MySmile onNext={next} />}
        {slide.type === "riddle" && (
          <Riddle1
            answered={riddleAnswered}
            setAnswered={setRiddleAnswered}
            onNext={next}
          />
        )}
        {slide.type === "gallery" && slide.category === "video-calls" && (
          <VideoCallGallery onNext={next} />
        )}
        {slide.type === "gallery" && slide.category === "bikes" && (
          <BikeRides onNext={next} />
        )}
        {slide.type === "video-moment-2" && (
          <GoofingAround
            playing={video2Playing}
            setPlaying={setVideo2Playing}
            onNext={next}
          />
        )}
        {slide.type === "riddle-2" && (
          <Riddle2
            answered={riddle2Answered}
            setAnswered={setRiddle2Answered}
            onNext={next}
          />
        )}
        {slide.type === "sad-reveal" && (
          <SadReveal
            revealed={sadRevealed}
            setRevealed={setSadRevealed}
            onNext={next}
          />
        )}
        {slide.type === "timeline" && <OurStory onNext={next} />}
        {slide.type === "gallery-full" && <MoreMoments onNext={next} />}
        {slide.type === "eyes" && <EyesSlide onNext={next} />}
        {slide.type === "main-character" && (
          <MainCharacterSlide onNext={next} />
        )}
        {slide.type === "letter" && <Letter onNext={next} />}
        {slide.type === "honey" && <HoneySection onNext={next} />}
        {slide.type === "final" && <FinalShowcase />}
      </div>
    </div>
  );
}

/* ── Reusable components ── */

function SlideWrap({ children, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "1px solid var(--accent)",
        color: "var(--accent)",
        padding: "12px 28px",
        borderRadius: 2,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "var(--offwhite)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--accent)";
      }}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

function PhotoFrame({ children, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        padding: 12,
        background: "var(--offwhite)",
        boxShadow:
          "0 2px 40px rgba(61,47,37,0.12), 0 0 0 1px rgba(184,151,106,0.2)",
        borderRadius: 4,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 6,
          border: "1px solid rgba(184,151,106,0.25)",
          borderRadius: 2,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {children}
    </div>
  );
}

function PlaceholderMedia({
  label,
  icon: Icon = Camera,
  aspect = "4/5",
  style = {},
}) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: aspect,
        background: "var(--warm)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        borderRadius: 2,
        color: "var(--stone)",
        ...style,
      }}
    >
      <Icon size={28} strokeWidth={1.2} />
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "0 16px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Label({ children, style = {} }) {
  return (
    <p
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(13px, 3.5vw, 16px)",
        fontStyle: "italic",
        color: "var(--stone)",
        textAlign: "center",
        lineHeight: 1.7,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Heading({ children, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(28px, 8vw, 52px)",
        fontWeight: 300,
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        color: "var(--deep)",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        maxWidth: 200,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
      <Heart size={10} fill="var(--accent)" color="var(--accent)" />
      <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
    </div>
  );
}

/* ── Slides ── */

function VideoHero({ onNext }) {
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        a little something for you
      </p>
      <PhotoFrame style={{ width: "100%" }}>
        <video
          controls
          muted
          playsInline
          preload="metadata"
          poster="/thumbnail.jpeg"
          style={{
            width: "100%",
            aspectRatio: "9 / 16",
            maxHeight: 480,
            objectFit: "cover",
            borderRadius: 2,
            display: "block",
          }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      </PhotoFrame>

      <Divider />
      <Label>press play and stay a while...</Label>
      <Btn onClick={onNext} icon={ChevronDown}>
        Continue
      </Btn>
    </SlideWrap>
  );
}

function BirthdayTitle({ onNext, thanked, setThanked }) {
  return (
    <SlideWrap>
      <div style={{ position: "relative" }}>
        <Sun
          size={16}
          color="var(--accent)"
          style={{
            position: "absolute",
            top: -24,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <Heading>
        Happy Birthday,
        <br />
        <em>my sunshine.</em>
      </Heading>
      <Divider />
      <PhotoFrame style={{ width: "100%", maxWidth: 320 }}>
        <img
          src="/sunshine.jpeg"
          alt="Sunshine"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            display: "block",
            borderRadius: 2,
          }}
        />
      </PhotoFrame>
      <Label>
        The world got a little warmer the day you were born.
        <br />
        I'm so glad it did.
      </Label>
      {!thanked ? (
        <Btn
          onClick={() => {
            setThanked(true);
          }}
          icon={Heart}
        >
          Thank you ♡
        </Btn>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Label
            style={{
              fontStyle: "normal",
              fontSize: 13,
              color: "var(--accent)",
            }}
          >
            aw, now let me show you something special —
          </Label>
          <Btn onClick={onNext} icon={ChevronDown}>
            Show me
          </Btn>
        </div>
      )}
    </SlideWrap>
  );
}

function ChildhoodGrid({ onNext }) {
  const photos = [
    {
      src: "/child1.jpeg",
      alt: "Childhood photo 1",
      note: "tiny little cutie",
    },
    {
      src: "/child2.jpeg",
      alt: "Childhood photo 2",
      note: "so small, so cute",
    },
    {
      src: "/child3.jpeg",
      alt: "Childhood photo 3",
      note: "serious babygirl",
    },
    {
      src: "/child4.jpeg",
      alt: "Childhood photo 4",
      note: "tiny lil gentleman",
    },
  ];

  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        little him
      </p>
      <Heading style={{ fontSize: "clamp(24px, 6vw, 40px)" }}>
        on April 17, 2002,
        <br />
        <em>this cute lil baby boy was born.</em>
      </Heading>
      <Label style={{ maxWidth: 340 }}>
        And honestly, the world became a little better that day.
        <br />
        These are some of my favorite tiny Jaswant memories,
        <br />
      </Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          width: "100%",
        }}
      >
        {photos.map((photo, i) => (
          <PhotoFrame key={i} style={{ padding: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 2,
                  background: "var(--warm)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--stone)",
                  textAlign: "center",
                  minHeight: 28,
                }}
              >
                {photo.note}
              </span>
            </div>
          </PhotoFrame>
        ))}
      </div>
      <Divider />
      <Label style={{ maxWidth: 330 }}>
        now... should we see the 17 year old Jaswant?
        <br />
        uhmmm i guess yeah.
      </Label>
      <Btn onClick={onNext} icon={ChevronDown}>
        let's go!!
      </Btn>
    </SlideWrap>
  );
}

function SkinnyGrid({ onNext }) {
  const photos = [
    {
      src: "/teen1.jpeg",
      alt: "Before transformation photo 1",
      note: "",
      aspect: "4 / 5",
      span: "span 2",
    },
    {
      src: "/teen2.jpeg",
      alt: "Before transformation photo 2",
      note: "",
      aspect: "1 / 1",
      span: "auto",
    },
    {
      src: "/teen5.jpeg",
      alt: "Before transformation photo 3",
      note: "",
      aspect: "1 / 1",
      span: "auto",
    },
    {
      src: "/teen6.jpeg",
      alt: "Before transformation photo 4",
      note: "",
      aspect: "16 / 9",
      span: "span 2",
    },
  ];

  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        the pre-muscle-man chapter{" "}
      </p>
      <Heading style={{ fontSize: "clamp(24px, 6vw, 40px)" }}>
        before yoy became
        <br />
        <em>muscle man jaswant.</em>
      </Heading>
      <Label style={{ maxWidth: 340 }}>
        Here is the era where you was very skinny, very cute, and somehow still
        carrying full hero energy.
        <br />
        Honestly, even before the transformation, you was already a whole
        heart-stealer.
      </Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          width: "100%",
        }}
      >
        {photos.map((photo, i) => (
          <PhotoFrame
            key={i}
            style={{
              padding: 6,
              gridColumn: photo.span,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: "100%",
                  aspectRatio: photo.aspect,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 2,
                  background: "var(--warm)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--stone)",
                  textAlign: "center",
                  minHeight: 28,
                }}
              >
                {photo.note}
              </span>
            </div>
          </PhotoFrame>
        ))}
      </div>
      <Divider />
      <Label style={{ maxWidth: 330 }}>
        okayyyy... enough of the old version.
        <br />
        lets see how u look now??
      </Label>
      <Btn onClick={onNext} icon={ChevronDown}>
        lets see how u look now??
      </Btn>
    </SlideWrap>
  );
}

function MuscleSlider({ onNext }) {
  const photos = [
    {
      src: "/muscle6.jpeg",
      alt: "Current Jaswant photo 1",
      title: "",
    },
    {
      src: "/muscle5.jpeg",
      alt: "Current Jaswant photo 2",
      title: "",
    },
    {
      src: "/muscle3.jpeg",
      alt: "Current Jaswant photo 3",
      title: "",
    },
    {
      src: "/muscle4.jpeg",
      alt: "Current Jaswant photo 4",
      title: "",
    },
    {
      src: "/muscle1.jpeg",
      alt: "Current Jaswant photo 5",
      title: "",
    },
    {
      src: "/muscle2.jpeg",
      alt: "Current Jaswant photo 5",
      title: "",
    },
    {
      src: "/muscle7.jpeg",
      alt: "Current Jaswant photo 5",
      title: "the final form, apparently",
    },
  ];
  const [active, setActive] = useState(0);
  const currentPhoto = photos[active];

  const goPrev = () => {
    setActive((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActive((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        The Muscle Bunny{" "}
      </p>
      <Heading style={{ fontSize: "clamp(24px, 6vw, 40px)" }}>
        and then,
        <br />
        <em>bhooooom!!.</em>
      </Heading>
      <Label style={{ maxWidth: 340 }}>
        Somewhere along the way, the soft little boy turned into this quietly
        breathtaking man.
        <br />
        Stronger now, sharper now, and still impossibly lovely in every frame.
      </Label>
      <PhotoFrame style={{ width: "100%", maxWidth: 360 }}>
        <img
          key={currentPhoto.src}
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            objectFit: "cover",
            display: "block",
            borderRadius: 2,
            background: "var(--warm)",
          }}
        />
      </PhotoFrame>
      <Label
        style={{
          maxWidth: 320,
          fontStyle: "normal",
          fontSize: 13,
          color: "var(--accent)",
        }}
      >
        {currentPhoto.title}
      </Label>
      <Label
        style={{
          fontStyle: "normal",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        {active + 1} / {photos.length}
      </Label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          width: "100%",
        }}
      >
        <button
          onClick={goPrev}
          style={{
            background: "transparent",
            border: "1px solid var(--sand)",
            color: "var(--deep)",
            padding: "10px 16px",
            borderRadius: 999,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Previous
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === active ? 18 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                background: i === active ? "var(--accent)" : "var(--sand)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          style={{
            background: "transparent",
            border: "1px solid var(--sand)",
            color: "var(--deep)",
            padding: "10px 16px",
            borderRadius: 999,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Next
        </button>
      </div>
      <Divider />
      <Btn onClick={onNext} icon={ChevronDown}>
        Keep going
      </Btn>
    </SlideWrap>
  );
}

function RainWalk({ playing, setPlaying, onNext }) {
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        our little moments
      </p>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 38px)" }}>
        that rainy evening walk
      </Heading>
      <PhotoFrame style={{ width: "100%", position: "relative" }}>
        {!playing ? (
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setPlaying(true)}
          >
            <PlaceholderMedia
              label="/rainwalk.mp4"
              icon={CloudRain}
              aspect="16/9"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(245,240,232,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(61,47,37,0.2)",
                }}
              >
                <Play
                  size={20}
                  color="var(--accent)"
                  fill="var(--accent)"
                  style={{ marginLeft: 3 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "var(--deep)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <video
              autoPlay
              controls
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src="/rainwalk.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </PhotoFrame>
      <Label>
        The rain didn't ruin anything.
        <br />
        It made everything feel more like us.
      </Label>
      <Divider />
      <Btn onClick={onNext} icon={ChevronDown}>
        Next moment
      </Btn>
    </SlideWrap>
  );
}

function MySmile({ onNext }) {
  const photos = [
    { src: "/smile1.jpeg", alt: "Smile 1" },
    { src: "/smile2.jpeg", alt: "Smile 2" },
    { src: "/smile3.jpeg", alt: "Smile 3" },
  ];

  return (
    <SlideWrap>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 38px)" }}>
        you make me smile
        <br />
        <em>like this.</em>
      </Heading>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          width: "100%",
        }}
      >
        {photos.map((photo) => (
          <PhotoFrame key={photo.src} style={{ padding: 6 }}>
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: "100%",
                aspectRatio: "3 / 4",
                objectFit: "cover",
                display: "block",
                borderRadius: 2,
              }}
            />
          </PhotoFrame>
        ))}
      </div>

      <Label style={{ maxWidth: 320 }}>
        My days are so much happier with you around.
        <br />
        You don't even have to try — you just do.
      </Label>

      <Divider />
      <Btn onClick={onNext} icon={ChevronDown}>
        Keep going
      </Btn>
    </SlideWrap>
  );
}

// function Riddle1({ answered, setAnswered, onNext }) {
//   const [selected, setSelected] = useState(null);
//   const photos = [
//     { src: "/riddle1.jpeg", alt: "Riddle photo 1", isCorrect: false },
//     { src: "/riddle2.jpeg", alt: "Riddle photo 2", isCorrect: true },
//     { src: "/riddle3.jpeg", alt: "Riddle photo 3", isCorrect: false },
//   ];
//   const revealed = selected !== null;
//   const selectedPhoto = revealed ? photos[selected] : null;

//   return (
//     <SlideWrap>
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: "50%",
//           border: "1px solid var(--accent)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <HelpCircle size={20} color="var(--accent)" strokeWidth={1.5} />
//       </div>
//       <Heading style={{ fontSize: "clamp(20px, 5.5vw, 34px)" }}>
//         can you guess?
//       </Heading>
//       <Label>
//         Which photo of mine did you first reply to?
//         <br />
//         <span
//           style={{ color: "var(--accent)", fontStyle: "normal", fontSize: 13 }}
//         >
//           (you know the one - the one that started it all)
//         </span>
//       </Label>

//       {!revealed ? (
//         <>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(3, 1fr)",
//               gap: 10,
//               width: "100%",
//             }}
//           >
//             {photos.map((photo, i) => (
//               <button
//                 key={photo.src}
//                 onClick={() => setSelected(i)}
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   padding: 0,
//                   cursor: "pointer",
//                 }}
//               >
//                 <PhotoFrame style={{ padding: 6 }}>
//                   <img
//                     src={photo.src}
//                     alt={photo.alt}
//                     style={{
//                       width: "100%",
//                       aspectRatio: "1 / 1",
//                       objectFit: "cover",
//                       display: "block",
//                       borderRadius: 2,
//                     }}
//                   />
//                 </PhotoFrame>
//               </button>
//             ))}
//           </div>
//           <Label style={{ fontStyle: "normal", color: "var(--stone)" }}>
//             tap the photo
//           </Label>
//         </>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 16,
//           }}
//         >
//           <PhotoFrame style={{ width: "100%", maxWidth: 300 }}>
//             <img
//               src={selectedPhoto.src}
//               alt={selectedPhoto.alt}
//               style={{
//                 width: "100%",
//                 aspectRatio: "1 / 1",
//                 objectFit: "cover",
//                 display: "block",
//                 borderRadius: 2,
//               }}
//             />
//           </PhotoFrame>
//           {selectedPhoto.isCorrect ? (
//             <>
//               <Label style={{ color: "var(--accent)", fontStyle: "normal" }}>
//                 yep. that one. the beginning of everything. ?
//               </Label>
//               <Btn
//                 onClick={() => {
//                   setAnswered(true);
//                   onNext();
//                 }}
//                 icon={ChevronDown}
//               >
//                 Aww, continue
//               </Btn>
//             </>
//           ) : (
//             <>
//               <Label style={{ color: "var(--stone)", fontStyle: "normal" }}>
//                 nooo, not that one. try again, love.
//               </Label>
//               <Btn onClick={() => setSelected(null)} icon={Star}>
//                 Try again
//               </Btn>
//             </>
//           )}
//         </div>
//       )}
//     </SlideWrap>
//   );
// }

function VideoCallGallery({ onNext }) {
  const frames = [1, 2, 3, 4, 5, 6];
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      ></p>
      <Heading style={{ fontSize: "clamp(20px, 5.5vw, 34px)" }}>
        our goofy video calls
      </Heading>
      <Label>
        not you writing and me watching you...spending time together.
        <br />
      </Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 14,
          width: "100%",
        }}
      >
        {frames.map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
            }}
          >
            <img
              src={`/vc${i + 1}.jpeg`}
              alt={`Video call ${i + 1}`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                borderRadius: 2,
              }}
            />
          </div>
        ))}
      </div>
      <Divider />
      <Btn onClick={onNext} icon={ChevronDown}>
        More of us
      </Btn>
    </SlideWrap>
  );
}

function BikeRides({ onNext }) {
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        wind in our hair
      </p>
      <Heading style={{ fontSize: "clamp(20px, 5.5vw, 34px)" }}>
        bike rides with you
      </Heading>
      <PhotoFrame style={{ width: "100%" }}>
        <video
          src="/bikeride.mp4"
          controls
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            display: "block",
            borderRadius: 2,
            background: "var(--warm)",
          }}
        />
      </PhotoFrame>
      <Label>Every road feels like an adventure when it's with you.</Label>
      <Btn onClick={onNext} icon={ChevronDown}>
        Next
      </Btn>
    </SlideWrap>
  );
}

function GoofingAround({ playing, setPlaying, onNext }) {
  return (
    <SlideWrap>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        us, being total idiots
      </Heading>
      <PhotoFrame style={{ width: "100%" }}>
        <video
          src="/hello.mp4"
          controls
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            display: "block",
            borderRadius: 2,
            background: "var(--warm)",
          }}
        />
      </PhotoFrame>
      <Label>I love that we can be completely silly together.</Label>
      <Divider />
      <Btn onClick={onNext} icon={ChevronDown}>
        One more thing
      </Btn>
    </SlideWrap>
  );
}

// function Riddle2({ answered, setAnswered, onNext }) {
//   const [revealed, setRevealed] = useState(false);
//   return (
//     <SlideWrap>
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: "50%",
//           border: "1px solid var(--accent)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <MessageCircle size={20} color="var(--accent)" strokeWidth={1.5} />
//       </div>
//       <Heading style={{ fontSize: "clamp(20px, 5.5vw, 34px)" }}>
//         another riddle, Jaswant
//       </Heading>
//       <Label>
//         Where was the first place we went together
//         <br />
//         and pretended it wasn't a date?
//       </Label>
//       <PhotoFrame style={{ width: "100%", maxWidth: 300 }}>
//         <PlaceholderMedia
//           label="That first 'not-a-date' photo — add it here!"
//           icon={Coffee}
//           aspect="4/3"
//         />
//       </PhotoFrame>
//       {!revealed ? (
//         <div
//           style={{
//             display: "flex",
//             gap: 12,
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {["Option A", "Option B", "Option C"].map((opt, i) => (
//             <Btn key={i} onClick={() => setRevealed(true)} icon={Star}>
//               {opt} — replace me!
//             </Btn>
//           ))}
//         </div>
//       ) : (
//         <>
//           <Label style={{ color: "var(--accent)", fontStyle: "normal" }}>
//             It was always a date. We both knew it.
//           </Label>
//           <Btn
//             onClick={() => {
//               setAnswered(true);
//               onNext();
//             }}
//             icon={ChevronDown}
//           >
//             Hehe, continue
//           </Btn>
//         </>
//       )}
//     </SlideWrap>
//   );
// }

function SadReveal({ revealed, setRevealed, onNext }) {
  return (
    <SlideWrap>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        do you know how my days are
        <br />
        <em>without you?</em>
      </Heading>
      <Label>tap to find out</Label>
      {!revealed ? (
        <Btn onClick={() => setRevealed(true)} icon={Eye}>
          How?
        </Btn>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <PhotoFrame style={{ width: "100%", maxWidth: 300 }}>
            <img
              src="/sad.jpeg"
              alt="Sad pouty face"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                display: "block",
                borderRadius: 2,
              }}
            />
            <PlaceholderMedia
              label="My sad face — that one pouty photo of you"
              icon={Moon}
              aspect="1/1"
              style={{ display: "none" }}
            />
          </PhotoFrame>
          <Label style={{ maxWidth: 300 }}>
            Grey. Quiet. Missing something.
            <br />
            Missing you.
          </Label>
          <Btn onClick={onNext} icon={ChevronDown}>
            don't leave me sad, next
          </Btn>
        </div>
      )}
    </SlideWrap>
  );
}

function OurStory({ onNext }) {
  const moments = [
    {
      icon: MessageCircle,
      text: "December 2023",
      detail:
        "We started talking on Instagram, and somehow one conversation turned into us.",
    },
    {
      icon: Heart,
      text: "January 8",
      detail:
        "That is the day we became ours. The day 'you and me' turned into something real.",
    },
    {
      icon: Coffee,
      text: "Our random little outings",
      detail:
        "Glen's, Corner House, ice cream runs, and all those simple plans that became my favorite memories.",
    },
    {
      icon: Sunset,
      text: "Rides to sunset points",
      detail:
        "Those rides with you felt soft, golden, and somehow bigger than the places we were going.",
    },
    {
      icon: CloudRain,
      text: "Rainy rides and rainy walks",
      detail:
        "The rain never ruined anything. If anything, it made every moment with you feel even more ours.",
    },
    {
      icon: Moon,
      text: "Midnight ice cream",
      detail:
        "Because with you, even the most random late-night cravings became little love stories.",
    },
    {
      icon: Flame,
      text: "Our fights too",
      detail:
        "Even when we fight, you come back the next day with your love, your effort, and your surprises.",
    },
    {
      icon: Star,
      text: "All the in-between moments",
      detail:
        "The silly days, the soft days, the chaos, the comfort - all of it became my favorite chapter.",
    },
  ];
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        our little love story
      </p>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        how we became
        <br />
        <em>us.</em>
      </Heading>
      <Label style={{ maxWidth: 340 }}>
        It did not happen all at once.
        <br />
        It happened in texts, rides, ice creams, rain, fights, and all the soft
        little ways we kept choosing each other.
      </Label>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {moments.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "16px 0",
                borderBottom:
                  i < moments.length - 1 ? "1px solid var(--warm)" : "none",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: "1px solid var(--sand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <Icon size={14} color="var(--accent)" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    fontWeight: 400,
                    color: "var(--deep)",
                    marginBottom: 2,
                  }}
                >
                  {m.text}
                </p>
                <p style={{ fontSize: 12, color: "var(--stone)" }}>
                  {m.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Btn onClick={onNext} icon={ChevronDown}>
        More photos
      </Btn>
    </SlideWrap>
  );
}

function MoreMoments({ onNext }) {
  const slots = Array.from({ length: 9 });
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        all the little things
      </p>
      <Heading style={{ fontSize: "clamp(20px, 5.5vw, 34px)" }}>
        us, everywhere
      </Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          width: "100%",
        }}
      >
        {slots.map((_, i) => (
          <PhotoFrame key={i} style={{ padding: 4 }}>
            <img
              src={`/m${i + 1}.jpeg`}
              alt={`Moment ${i + 1}`}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                display: "block",
                borderRadius: 2,
                minHeight: 60,
              }}
            />
          </PhotoFrame>
        ))}
      </div>
      <Label>Every single one of these made me smile.</Label>
      <Btn onClick={onNext} icon={ChevronDown}>
        Almost there
      </Btn>
    </SlideWrap>
  );
}

function EyesSlide({ onNext }) {
  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        something simple
      </p>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        the way i look
        <br />
        <em>at you.</em>
      </Heading>
      <div
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 28,
          background:
            "linear-gradient(180deg, rgba(250,248,244,0.98) 0%, rgba(237,232,220,0.92) 100%)",
          boxShadow: "0 16px 44px rgba(61,47,37,0.08)",
          border: "1px solid rgba(184,151,106,0.22)",
        }}
      >
        <PhotoFrame style={{ padding: 8 }}>
          <img
            src="/eyes.jpeg"
            alt="Dark brown shining eyes"
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              display: "block",
              borderRadius: 18,
            }}
          />
        </PhotoFrame>
      </div>
      <Label style={{ maxWidth: 340, fontSize: "clamp(14px, 4vw, 17px)" }}>
        You can see it there every single time.
        <br />
        My eyes have always had the softest kind of love for you, even in the
        quiet moments when I do not say a word.
      </Label>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {[
          "The way I look at you has always been full of love.",
          "Even before I say it, my eyes tell you how much you mean to me.",
        ].map((line, i) => (
          <div
            key={i}
            style={{
              padding: "14px 12px",
              borderRadius: 18,
              background: "rgba(250,248,244,0.86)",
              border: "1px solid rgba(184,151,106,0.2)",
              color: "var(--stone)",
              fontSize: 12,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <Btn onClick={onNext} icon={ChevronDown}>
        Read my letter
      </Btn>
    </SlideWrap>
  );
}

function MainCharacterSlide({ onNext }) {
  const photos = [
    {
      src: "/me1.jpeg",
      alt: "Main character moment one",
      rotate: "-3deg",
      aspectRatio: "4/5",
      column: "1 / span 6",
      row: "1 / span 2",
      top: 0,
    },
    {
      src: "/me2.jpeg",
      alt: "Main character moment two",
      rotate: "2deg",
      aspectRatio: "5/4",
      column: "7 / span 4",
      row: "1 / span 1",
      top: 18,
    },
    {
      src: "/me3.jpeg",
      alt: "Main character moment three",
      rotate: "-1deg",
      aspectRatio: "4/4.8",
      column: "7 / span 4",
      row: "2 / span 1",
      top: 6,
    },
  ];

  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        with you, somehow
      </p>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        you make me feel
        <br />
        <em>like the main character.</em>
      </Heading>
      <Label style={{ maxWidth: 335 }}>
        Everywhere we go, the whole world feels softer, prettier, and a little
        more cinematic when I am with you.
      </Label>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridAutoRows: "minmax(90px, auto)",
          gap: 10,
          alignItems: "start",
        }}
      >
        {photos.map((photo, i) => (
          <PhotoFrame
            key={photo.src}
            style={{
              gridColumn: photo.column,
              gridRow: photo.row,
              padding: i === 0 ? 7 : 6,
              transform: `rotate(${photo.rotate})`,
              marginTop: photo.top,
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: "100%",
                aspectRatio: photo.aspectRatio,
                objectFit: "cover",
                display: "block",
                borderRadius: 3,
              }}
            />
          </PhotoFrame>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 10,
        }}
      >
        <div
          style={{
            padding: "16px 14px",
            borderRadius: 18,
            background: "rgba(250,248,244,0.88)",
            border: "1px solid rgba(184,151,106,0.2)",
            color: "var(--deep)",
            lineHeight: 1.65,
            fontSize: 13,
          }}
        >
          It is not even about the photos. It is the way you make me feel seen,
          loved, and a little extra in the best way.
        </div>
        <div
          style={{
            padding: "16px 12px",
            borderRadius: 18,
            background: "linear-gradient(180deg, var(--offwhite), var(--warm))",
            border: "1px solid rgba(184,151,106,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "var(--stone)",
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          with you,
          <br />
          every place
          <br />
          feels like a scene
        </div>
      </div>
      <Btn onClick={onNext} icon={ChevronDown}>
        Next
      </Btn>
    </SlideWrap>
  );
}

function Letter({ onNext }) {
  return (
    <SlideWrap>
      <div
        style={{
          width: "100%",
          background: "var(--offwhite)",
          borderRadius: 4,
          padding: "32px 28px",
          boxShadow: "0 2px 40px rgba(61,47,37,0.08)",
          border: "1px solid rgba(184,151,106,0.2)",
          position: "relative",
        }}
      >
        <Feather
          size={16}
          color="var(--accent)"
          style={{ marginBottom: 16 }}
          strokeWidth={1.5}
        />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 4vw, 19px)",
            lineHeight: 1.85,
            color: "var(--deep)",
            fontStyle: "italic",
          }}
        >
          Dear Jaswant,
          <br />
          <br />
          You came into my life and suddenly everything got so much better. The
          kind of light that you bought into my life. The light that stays, Even
          when it's hard, Even when we're annoying each other.
          <br />
          <br />
          I hope this birthday feels like the biggest, warmest hug....because
          that's what you deserve. Every single day.
          <br />
          <br />
          Thank you for being exactly who you are.
          <br />
          I Love you so much it's a little embarrassing.
          <br />
          <br />
          <span
            style={{
              fontStyle: "normal",
              fontSize: "90%",
              color: "var(--accent)",
            }}
          >
            with all my love — always ♡
          </span>
        </p>
      </div>
      <Btn onClick={onNext} icon={Heart}>
        Wanna know what else we missed?
      </Btn>
    </SlideWrap>
  );
}

function HoneySection({ onNext }) {
  const photos = [
    {
      src: "/honey1.jpeg",
      alt: "You and Jaswant with Honey",
      rotate: "-2deg",
      aspect: "4/5",
      alignSelf: "start",
    },
    {
      src: "/honey2.jpeg",
      alt: "Another sweet photo with Honey",
      rotate: "2deg",
      aspect: "5/4",
      alignSelf: "end",
    },
  ];

  return (
    <SlideWrap>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        ohh one more thing we missed
      </p>
      <Heading style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
        guess wt??
      </Heading>
      <Label style={{ maxWidth: 330 }}>
        There is one tiny, fluffy, dramatic detail in our story that could never
        be skipped.
      </Label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 18px",
          border: "1px solid rgba(184,151,106,0.28)",
          background: "rgba(250,248,244,0.9)",
          borderRadius: 999,
        }}
      >
        <Cat size={20} color="var(--accent)" strokeWidth={1.7} />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(26px, 7vw, 38px)",
            fontWeight: 700,
            color: "var(--deep)",
          }}
        >
          Honey
        </span>
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 12,
          alignItems: "start",
        }}
      >
        {photos.map((photo, i) => (
          <PhotoFrame
            key={photo.src}
            style={{
              padding: 6,
              transform: `rotate(${photo.rotate})`,
              alignSelf: photo.alignSelf,
              marginTop: i === 1 ? 28 : 0,
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: "100%",
                aspectRatio: photo.aspect,
                objectFit: "cover",
                display: "block",
                borderRadius: 2,
              }}
            />
          </PhotoFrame>
        ))}
      </div>

      <Label style={{ maxWidth: 340 }}>
        Honey is a lil baby boy, and yes, you low-key hate him a little because
        I love him too much. Which honestly just makes this whole thing even
        funnier and cuter to me.
      </Label>
      <Label style={{ maxWidth: 340, marginTop: -12 }}>
        Still, the three of us absolutely deserved a page here.
      </Label>

      <Btn onClick={onNext} icon={ChevronDown}>
        And one last thing
      </Btn>
    </SlideWrap>
  );
}

function Final() {
  const [count, setCount] = useState(0);
  const photos = [
    {
      src: "/him4.jpeg",
      alt: "Jaswant looking handsome 1",
      column: "1 / span 6",
      row: "1 / span 2",
      rotate: "-2deg",
      top: 0,
      objectPosition: "38% center",
      fillFrame: true,
    },
    {
      src: "/him2.jpeg",
      alt: "Jaswant looking handsome 2",
      column: "7 / span 4",
      row: "1 / span 1",
      rotate: "2deg",
      top: 18,
      fillFrame: true,
    },
    {
      src: "/him3.jpeg",
      alt: "Jaswant looking handsome 3",
      column: "7 / span 4",
      row: "2 / span 1",
      rotate: "-1deg",
      top: 4,
      fillFrame: true,
    },
    {
      src: "/him1.jpeg",
      alt: "Jaswant looking handsome 4",
      column: "2 / span 8",
      row: "3 / span 1",
      rotate: "1deg",
      top: -6,
      fillFrame: true,
    },
  ];
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c < 99 ? c + 1 : c)), 40);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideWrap>
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "1px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Heart
            size={36}
            color="var(--accent)"
            fill="var(--accent)"
            strokeWidth={1}
          />
          <div
            style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              background: "var(--cream)",
              border: "1px solid var(--sand)",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            +∞
          </div>
        </div>
        <Heading>
          Happy Birthday,
          <br />
          <em>Jaswant.</em>
        </Heading>
        <Divider />
        <Label style={{ maxWidth: 320, fontSize: "clamp(14px, 4vw, 18px)" }}>
          Here's to you, and us, and every beautiful, chaotic, silly, tender
          moment yet to come.
        </Label>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 360,
            minHeight: 560,
            marginTop: 8,
          }}
        >
          {photos.map((photo, i) => (
            <PhotoFrame
              key={photo.src}
              style={{
                position: "absolute",
                padding: i === 0 ? 7 : 6,
                transform: `rotate(${photo.rotate})`,
                top: i === 0 ? 0 : i === 1 ? 58 : i === 2 ? 250 : 418,
                left: i === 0 ? 18 : i === 1 ? 210 : i === 2 ? 12 : 92,
                width: i === 0 ? 150 : i === 1 ? 126 : i === 2 ? 132 : 176,
                height: i === 0 ? 200 : i === 1 ? 168 : i === 2 ? 150 : 116,
                overflow: "hidden",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: photo.objectPosition || "center",
                  display: "block",
                  borderRadius: 3,
                }}
              />
            </PhotoFrame>
          ))}
        </div>
        <Label style={{ marginTop: 8, fontSize: 13, letterSpacing: "0.05em" }}>
          four frames were not enough for how handsome you look, but it is a
          start.
        </Label>
      </div>
    </SlideWrap>
  );
}

function FinalShowcase() {
  const photos = [
    {
      src: "/him4.jpeg",
      alt: "Jaswant looking handsome 1",
      aspectRatio: "4/5",
      objectPosition: "38% center",
      objectFit: "contain",
    },
    {
      src: "/him2.jpeg",
      alt: "Jaswant looking handsome 2",
      aspectRatio: "1/1",
    },
    {
      src: "/him3.jpeg",
      alt: "Jaswant looking handsome 3",
      aspectRatio: "1/1",
    },
    {
      src: "/him1.jpeg",
      alt: "Jaswant looking handsome 4",
      aspectRatio: "16/10",
    },
  ];

  return (
    <SlideWrap style={{ maxWidth: 520, gap: 18 }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        one last look at you
      </p>
      <Heading>
        Happy Birthday,
        <br />
        <em>Jaswant.</em>
      </Heading>
      <Divider />
      <Label style={{ maxWidth: 330, fontSize: "clamp(14px, 4vw, 18px)" }}>
        Here&apos;s to you, and us, and every beautiful, chaotic, silly, tender
        moment yet to come.
      </Label>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.08fr 0.92fr",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        <PhotoFrame
          style={{
            padding: 10,
            overflow: "hidden",
            width: "75%", // <--- Adjust this percentage to make it smaller
            margin: "0 auto", // <--- Keeps it centered in its grid column
            display: "flex",
          }}
        >
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: photos[0].aspectRatio,
              objectFit: "cover",
              objectPosition: photos[0].objectPosition || "center",
              display: "block",
            }}
          />
        </PhotoFrame>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr auto",
            gap: 12,
          }}
        >
          <div
            style={{
              padding: "18px 16px",
              background:
                "linear-gradient(180deg, var(--offwhite), var(--warm))",
              border: "1px solid rgba(184,151,106,0.22)",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 6vw, 30px)",
                lineHeight: 1.08,
                color: "var(--deep)",
              }}
            >
              still not over
              <br />
              how good
              <br />
              you look.
            </p>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: "var(--stone)",
              }}
            >
              unfair, honestly.
            </p>
          </div>

          <PhotoFrame style={{ padding: 6 }}>
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              style={{
                width: "100%",
                aspectRatio: photos[1].aspectRatio,
                objectFit: "cover",
                display: "block",
                borderRadius: 3,
              }}
            />
          </PhotoFrame>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 12,
          alignItems: "end",
        }}
      >
        <PhotoFrame style={{ padding: 6 }}>
          <img
            src={photos[2].src}
            alt={photos[2].alt}
            style={{
              width: "100%",
              aspectRatio: photos[2].aspectRatio,
              objectFit: "cover",
              display: "block",
              borderRadius: 3,
            }}
          />
        </PhotoFrame>

        <PhotoFrame style={{ padding: 7 }}>
          <img
            src={photos[3].src}
            alt={photos[3].alt}
            style={{
              width: "100%",
              aspectRatio: photos[3].aspectRatio,
              objectFit: "cover",
              display: "block",
              borderRadius: 3,
            }}
          />
        </PhotoFrame>
      </div>

      <Label style={{ marginTop: 8, fontSize: 13, letterSpacing: "0.05em" }}>
        four frames were not enough for how handsome you look, but it is a
        start.
      </Label>
    </SlideWrap>
  );
}
