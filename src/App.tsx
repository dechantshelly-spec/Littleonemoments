import React, { useState, useMemo, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

function Button({ className = "", children, ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

function Input({ className = "", ...props }) {
  return <input className={`w-full rounded-2xl border border-[#E8AEB7] p-3 ${className}`} {...props} />;
}

function Label({ children }) {
  return <label className="block text-sm mb-2 text-gray-700">{children}</label>;
}

const moments = [
  { id: "calm", label: "I Need Comfort" },
  { id: "happy", label: "I Feel Happy" },
  { id: "confident", label: "I Want To Feel Brave" },
  { id: "connection", label: "I Need A Hug" },
  { id: "comfort", label: "I Feel Upset" },
  { id: "growth", label: "I Want To Try Again" }
];

const plushies = [
  { id: "oli", name: "Oli the Octopus", emoji: "🐙" },
  { id: "sarah", name: "Sarah the Turtle", emoji: "🐢" },
  { id: "bean", name: "Bean the Bunny", emoji: "🐰" },
  { id: "della", name: "Della the Duck", emoji: "🦆" },
  { id: "myfriend", name: "My Friend", emoji: "💛" }
];

function buildMessage(name, momentId, plushie, customFriendName) {
  const child = name || "friend";

  const displayName =
    plushie.id === "myfriend"
      ? customFriendName?.trim() || "your little friend"
      : plushie.name;

  const messages = {
    oli: {
      calm: `${child}, I’m here with you,
It’s me, ${displayName}, soft and true.
If your day felt big or long,
You can rest where you belong.

Snuggle close, don’t rush, don’t run,
We can slow down, one by one.

I’m right here, I’m right here,
Holding you so calm and near.`,

      happy: `${child}, I’m here with you,
It’s me, ${displayName}, happy too.
When your smile shines so bright,
Everything feels warm and light.

Laugh and wiggle, clap or cheer,
I love being happy with you right here.

Happy heart, happy day,
Let your joy shine all the way.`,

      confident: `${child}, I see you try,
It’s me, ${displayName}, I'm nearby.
Sometimes things feel big or new,
But I believe so much in you.

Take one step, then maybe two,
I’ll stay right and cheer for you.

You are brave, you are strong,
You can try all day long.`,

      connection: `${child}, come close to me,
It’s me, ${displayName}, as snug as can be.
If you need a hug today,
I’m right here, I won’t go away.

Wrap me tight, hold me near,
I’ll stay close and always be here.

Hold me close, hold me tight,
Everything will be alright.`,

      comfort: `${child}, I’m here with you,
It’s me, ${displayName}, gentle and true.
If your feelings feel big today,
It’s okay to feel this way.

Tears or sighs or quiet time,
We can sit and feel, it fine.

I’m right here, I’m right here,
You are safe with me, no fear.`,

      growth: `${child}, I’m here with you,
It’s me, ${displayName}, kind and true.
If something didn’t go your way,
We can try again today.

Little steps are always okay,
You can learn along the way.

Try again, nice and slow,
You can do more than you know.`
    },

    sarah: {
      calm: `${child}, I’m here with you,
It’s me, ${displayName}, soft and true.
If your day felt big or long,
You can rest where you belong.

Snuggle close, don’t rush, don’t run,
We can slow down, one by one.

I’m right here, I’m right here,
Holding you so calm and near.`,

      happy: `${child}, I’m here with you,
It’s me, ${displayName}, happy too.
When your smile shines so bright,
Everything feels warm and light.

Laugh and wiggle, clap or cheer,
I love being happy with you right here.

Happy heart, happy day,
Let your joy shine all the way.`,

      confident: `${child}, I see you try,
It’s me, ${displayName}, I'm nearby.
Sometimes things feel big or new,
But I believe so much in you.

Take one step, then maybe two,
I’ll stay right and cheer for you.

You are brave, you are strong,
You can try all day long.`,

      connection: `${child}, come close to me,
It’s me, ${displayName}, as snug as can be.
If you need a hug today,
I’m right here, I won’t go away.

Wrap me tight, hold me near,
I’ll stay close and always be here.

Hold me close, hold me tight,
Everything will be alright.`,

      comfort: `${child}, I’m here with you,
It’s me, ${displayName}, gentle and true.
If your feelings feel big today,
It’s okay to feel this way.

Tears or sighs or quiet time,
We can sit and feel, it fine.

I’m right here, I’m right here,
You are safe with me, no fear.`,

      growth: `${child}, I’m here with you,
It’s me, ${displayName}, kind and true.
If something didn’t go your way,
We can try again today.

Little steps are always okay,
You can learn along the way.

Try again, nice and slow,
You can do more than you know.`
    },

    bean: {
      calm: `${child}, I’m here with you,
It’s me, ${displayName}, soft and true.
If your day felt big or long,
You can rest where you belong.

Snuggle close, don’t rush, don’t run,
We can slow down, one by one.

I’m right here, I’m right here,
Holding you so calm and near.`,

      happy: `${child}, I’m here with you,
It’s me, ${displayName}, happy too.
When your smile shines so bright,
Everything feels warm and light.

Laugh and wiggle, clap or cheer,
I love being happy with you right here.

Happy heart, happy day,
Let your joy shine all the way.`,

      confident: `${child}, I see you try,
It’s me, ${displayName}, I'm nearby.
Sometimes things feel big or new,
But I believe so much in you.

Take one step, then maybe two,
I’ll stay right and cheer for you.

You are brave, you are strong,
You can try all day long.`,

      connection: `${child}, come close to me,
It’s me, ${displayName}, as snug as can be.
If you need a hug today,
I’m right here, I won’t go away.

Wrap me tight, hold me near,
I’ll stay close and always be here.

Hold me close, hold me tight,
Everything will be alright.`,

      comfort: `${child}, I’m here with you,
It’s me, ${displayName}, gentle and true.
If your feelings feel big today,
It’s okay to feel this way.

Tears or sighs or quiet time,
We can sit and feel, it fine.

I’m right here, I’m right here,
You are safe with me, no fear.`,

      growth: `${child}, I’m here with you,
It’s me, ${displayName}, kind and true.
If something didn’t go your way,
We can try again today.

Little steps are always okay,
You can learn along the way.

Try again, nice and slow,
You can do more than you know.`
    },

    della: {
      calm: `${child}, I’m here with you,
It’s me, ${displayName}, soft and true.
If your day felt big or long,
You can rest where you belong.

Snuggle close, don’t rush, don’t run,
We can slow down, one by one.

I’m right here, I’m right here,
Holding you so calm and near.`,

      happy: `${child}, I’m here with you,
It’s me, ${displayName}, happy too.
When your smile shines so bright,
Everything feels warm and light.

Laugh and wiggle, clap or cheer,
I love being happy with you right here.

Happy heart, happy day,
Let your joy shine all the way.`,

      confident: `${child}, I see you try,
It’s me, ${displayName}, I'm nearby.
Sometimes things feel big or new,
But I believe so much in you.

Take one step, then maybe two,
I’ll stay right and cheer for you.

You are brave, you are strong,
You can try all day long.`,

      connection: `${child}, come close to me,
It’s me, ${displayName}, as snug as can be.
If you need a hug today,
I’m right here, I won’t go away.

Wrap me tight, hold me near,
I’ll stay close and always be here.

Hold me close, hold me tight,
Everything will be alright.`,

      comfort: `${child}, I’m here with you,
It’s me, ${displayName}, gentle and true.
If your feelings feel big today,
It’s okay to feel this way.

Tears or sighs or quiet time,
We can sit and feel, it fine.

I’m right here, I’m right here,
You are safe with me, no fear.`,

      growth: `${child}, I’m here with you,
It’s me, ${displayName}, kind and true.
If something didn’t go your way,
We can try again today.

Little steps are always okay,
You can learn along the way.

Try again, nice and slow,
You can do more than you know.`
    },

    myfriend: {
      calm: `${child}, I’m here with you,
It’s me, ${displayName}, soft and true.
If your day felt big or long,
You can rest where you belong.

Snuggle close, don’t rush, don’t run,
We can slow down, one by one.

I’m right here, I’m right here,
Holding you so calm and near.`,

      happy: `${child}, I’m here with you,
It’s me, ${displayName}, happy too.
When your smile shines so bright,
Everything feels warm and light.

Laugh and wiggle, clap or cheer,
I love being happy with you right here.

Happy heart, happy day,
Let your joy shine all the way.`,

      confident: `${child}, I see you try,
It’s me, ${displayName}, I'm nearby.
Sometimes things feel big or new,
But I believe so much in you.

Take one step, then maybe two,
I’ll stay right and cheer for you.

You are brave, you are strong,
You can try all day long.`,

      connection: `${child}, come close to me,
It’s me, ${displayName}, as snug as can be.
If you need a hug today,
I’m right here, I won’t go away.

Wrap me tight, hold me near,
I’ll stay close and always be here.

Hold me close, hold me tight,
Everything will be alright.`,

      comfort: `${child}, I’m here with you,
It’s me, ${displayName}, gentle and true.
If your feelings feel big today,
It’s okay to feel this way.

Tears or sighs or quiet time,
We can sit and feel, it fine.

I’m right here, I’m right here,
You are safe with me, no fear.`,

      growth: `${child}, I’m here with you,
It’s me, ${displayName}, kind and true.
If something didn’t go your way,
We can try again today.

Little steps are always okay,
You can learn along the way.

Try again, nice and slow,
You can do more than you know.`
    }
  };

  return messages[plushie.id]?.[momentId] || "A special moment just for you.";
}

export default function App() {
  const [name, setName] = useState("");
  const [momentId, setMomentId] = useState("calm");
  const [plushieId, setPlushieId] = useState("oli");
  const [generated, setGenerated] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [customFriendName, setCustomFriendName] = useState("");

  const plushie = plushies.find(p => p.id === plushieId) || plushies[0];
const plushie = plushies.find(p => p.id === plushieId) || plushies[0];

const displayPlushName =
  plushie.id === "myfriend"
    ? customFriendName.trim() || "My Friend"
    : plushie.name;
  const message = useMemo(() => buildMessage(name, momentId, plushie), [name, momentId, plushie]);
  const keepsakeRef = useRef<HTMLDivElement | null>(null);
const handleSaveKeepsake = async () => {
  if (!keepsakeRef.current) return;

  try {
    const canvas = await html2canvas(keepsakeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFF6EE",
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "little-moment-keepsake.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
    alert("save failed");
  }
};
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setCanInstall(false);
      setShowInstallHelp(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setCanInstall(false);
      return;
    }
    setShowInstallHelp(true);
  };
  
  return (
    <div className="min-h-screen bg-[#FFF6EE] p-6">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 rounded-2xl border border-[#E8AEB7] bg-white text-gray-700 hover:bg-[#EAF4EF] text-sm"
        >
          {canInstall ? "Install App" : "Add to Home Screen"}
        </button>
      </div>

      {showInstallHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-[#E8AEB7]">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Add to Your Phone</h2>
            <p className="text-sm mb-4 text-gray-600">Save this app so it is easy to open anytime. On some Android phones, you may see an install prompt automatically.</p>
            <div className="text-sm space-y-3 text-gray-700">
              <div>
                <strong>Android</strong>
                <p>Open the browser menu, then tap <em>Add to Home screen</em> or <em>Install app</em>.</p>
              </div>
              <div>
                <strong>iPhone</strong>
                <p>Tap the share button, then choose <em>{canInstall ? "Install App" : "Add to Home Screen"}</em>.</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstallHelp(false)}
              className="mt-5 w-full bg-[#9FB7A3] hover:bg-[#8FA89A] text-white p-3 rounded-2xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-3xl border border-[#E8AEB7] shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">This Little One Has a Message</h2>
          <p className="text-sm text-gray-500 mb-4">Create a special moment together.</p>

          <Label>Child Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <div className="mt-5">
            <Label>Choose a Moment</Label>
            <div className="grid grid-cols-3 gap-2">
              {moments.map((m) => (
                <Button
                  key={m.id}
                  onClick={() => setMomentId(m.id)}
                  className={`px-2 py-2 rounded-2xl text-sm border ${momentId===m.id ? "bg-[#9FB7A3] text-white" : "bg-white border-[#E8AEB7] hover:bg-[#EAF4EF]"}`}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Label>Choose Friend</Label>
            <div className="grid grid-cols-2 gap-3">
              {plushies.map(p => (
                <Button
                  key={p.id}
                  onClick={() => setPlushieId(p.id)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-2xl border ${plushieId===p.id ? "bg-[#9FB7A3] text-white" : "bg-white border-[#E8AEB7] hover:bg-[#EAF4EF]"}`}
                >
                  <span className="text-xl">{p.emoji}</span>
                  {p.name}
                </Button>
              ))}
            </div>
            {plushieId === "myfriend" && (
  <div className="mt-4">
    <Label>What is your friend’s name?</Label>
    <Input
      value={customFriendName}
      onChange={(e) => setCustomFriendName(e.target.value)}
      placeholder="Type your plushie's name"
    />
  </div>
)}
          </div>

          <Button
            onClick={() => {
  if (plushieId === "myfriend" && !customFriendName.trim()) {
    alert("Please type your friend’s name first 💛");
    return;
  }
  setGenerated(true);
}}
            className="mt-6 w-full bg-[#9FB7A3] text-white p-3 rounded-2xl"
          >
            ✨ Create Their Message
          </Button>
        </div>
             <div className="bg-white p-6 rounded-3xl border border-[#E8AEB7] shadow-sm">
          {!generated ? (
            <div className="h-full flex items-center justify-center min-h-[320px] text-center">
              <p>Your little friend is ready whenever you are.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl mb-2 text-gray-800 text-center">{displayPlushName} says:</h2>
              <p className="text-sm text-gray-500 mb-4 text-center">A special little moment, just for you.</p>

              <div
                ref={keepsakeRef}
                className="mx-auto w-full max-w-md relative"
              >
                <img
                  src="/keepsake-template.png"
                  alt="Keepsake template"
                  className="w-full h-auto block rounded-3xl"
                />

                <div className="absolute inset-[14%_12%_14%_12%] flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-gray-500 mb-2">This Little One Has a Message</p>

                  <p className="text-base font-semibold text-gray-800 mb-4">
                    {moments.find((m) => m.id === momentId)?.label}
                  </p>

                  <p className="whitespace-pre-line text-gray-700 leading-7 text-sm">
                    {message}
                  </p>

                  <p className="mt-4 text-sm text-gray-600">— {displayPlushName}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Follow along for new little stories and friends
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a
                    href="https://www.facebook.com/shelly.dechant"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-[#E8AEB7] bg-white hover:bg-[#EAF4EF] text-sm"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/shellydechant/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-[#E8AEB7] bg-white hover:bg-[#EAF4EF] text-sm"
                  >
                    Instagram
                  </a>
                </div>
              </div>
              <Button
                onClick={() => setGenerated(false)}
                className="mt-3 w-full border border-[#E8AEB7] bg-white text-gray-700 hover:bg-[#EAF4EF] p-3 rounded-2xl"
              >
                Create Another Moment
              </Button>
              
             <Button
  onClick={() => alert("Printable keepsakes are coming soon 💛")}
  className="mt-3 w-full bg-[#9FB7A3] text-white p-3 rounded-2xl"
>
  Printable Keepsakes are COMING SOON 💛
</Button>

              
            </>
          )}
        </div>

      </div>
    </div>
  );
}
