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
  { id: "calm", label: "Calm & Cozy" },
  { id: "happy", label: "Happy & Joyful" },
  { id: "brave", label: "Brave & Strong" },
  { id: "sleepy", label: "Sleepy & Bedtime" },
  { id: "comfort", label: "Gentle Comfort" },
  { id: "curious", label: "Curious & Wonder" }
];

const plushies = [
  { id: "oli", name: "Oli the Octopus", emoji: "🐙" },
  { id: "sarah", name: "Sarah the Turtle", emoji: "🐢" },
  { id: "bean", name: "Bean the Bunny", emoji: "🐰" },
  { id: "della", name: "Della the Duck", emoji: "🦆" }
];

function buildMessage(name, momentId, plushie) {
  const child = name || "friend";

  const messages = {
    oli: {
      calm: `Hi, ${child}… come sit with me,
The water is calm… as calm can be.

Take a breath… slow and deep,
Let your body soften and keep.

No need to hurry… no need to go,
We can stay… nice and slow.

The ocean hums… soft and low,
A quiet place your heart can go.

I’m right here… close and near,
You are safe… right here.

Just you and me… calm and free…
Resting together… quietly.

I’m right here with you, ${child}.`,
      happy: `Hi, ${child}! come laugh with me,
Let’s wiggle and giggle… one, two, three!

Clap your hands… stomp your feet,
Happy moments feel so sweet!

Spin around… and laugh out loud,
You shine bright… happy and proud!

Bubbles pop… joy flows free,
Happy feels good… just like the sea!

Stay and play… don’t go away…
I love this joy with you, ${child}!`,
      brave: `Hey, ${child}… take my arm,
We’ll move forward… safe and calm.

One small step… then one more too,
That is how brave grows in you.

Even if you feel unsure,
You are strong… of that I’m sure.

I’m right here… we’ll take it slow,
Brave will grow… more than you know.

You can do this… yes you can…
I believe in you, ${child}.`,
      sleepy: `Shhh now, ${child}… time for bed,
Rest your body… rest your head.

The ocean is quiet… the moon is low,
Sleep is coming… soft and slow.

Close your eyes… drift away,
Dreams are waiting… on their way.

I’ll stay near… all night through,
Watching softly… over you.

Goodnight now, ${child}… sleep tight.`,
      comfort: `Oh, ${child}… come close to me,
It’s okay… to feel wobbly.

Take a breath… in… and out,
Let your feelings move about.

You don’t have to be alone,
You’ve got me… your ocean home.

I’ll stay with you… nice and near,
You are safe… right here.

I’m right here with you, ${child}.`,
      curious: `Hey, ${child}… look and see,
Something glowing… in the sea.

Tiny lights… soft and bright,
Dancing gently… in the night.

Let’s explore… nice and slow,
There’s so much here… to know.

Come along… don’t be shy,
Let’s discover… you and I.

My curious friend, ${child}.`
    },
    sarah: {
      calm: `Hello, ${child}… come sit with me,
We can rest by the quiet sea.

Slow and steady… in… and out,
Let your body soften all about.

No need to hurry… no need to go,
We can stay… nice and slow.

The tide moves gently… calm and light,
Everything here feels just right.

I’m right beside you… safe and near,
You can relax… I’m right here.

I’ll stay right here with you, ${child}.`,
      happy: `Hello, ${child}… I see your light,
You’re shining warm… and shining bright.

Let’s sway gently… side to side,
Like soft waves upon the tide.

Smile so softly… feel it grow,
A happy glow… nice and slow.

Joy can be calm… soft and sweet,
Like gentle waves beneath your feet.

I feel your glow… shining through,
A quiet joy inside of you.

My happy friend, ${child}.`,
      brave: `Hello, ${child}… stay close to me,
We’ll move slowly… patiently.

One small step… then one more too,
That is how strength grows in you.

No need to rush… you’re doing fine,
Each small step is a brave sign.

Even slow… you are strong,
You’ve been brave all along.

I’m right beside you… all the way,
You are safe… as you go today.

I believe in you, ${child}.`,
      sleepy: `Hello, ${child}… time to rest,
Come in close… you are blessed.

The tide is slow… the world is still,
Sleep will come… soft and gentle.

Close your eyes… drift down deep,
Let your body fall to sleep.

The ocean rocks… side to side,
Like a cradle on the tide.

I’ll stay with you… the whole night through,
Watching softly over you.

Goodnight, dear ${child}.`,
      comfort: `Oh, ${child}… come close to me,
You are safe… as safe can be.

We can sit… and take our time,
Let your feelings gently unwind.

Slow and steady… in… and out,
Let the heavy drift about.

Nothing you feel is ever wrong,
I’ll stay with you… as long as long.

I’m right beside you… calm and near,
You are held… right here.

I’m here with you, ${child}.`,
      curious: `Hello, ${child}… come with me,
Let’s explore the quiet sea.

Slow and steady… look around,
There is wonder to be found.

Tiny lights… soft and low,
Watch them shimmer… watch them glow.

No need to rush… we’ll take it slow,
There’s so much here to gently know.

Step by step… side by side,
We’ll explore the ocean wide.

My curious friend, ${child}.`
    },
    bean: {
      calm: `Hi, ${child}… come snuggle near,
I’ll sit right close… right here.

We can tuck in… soft and tight,
Everything’s calm… everything’s right.

Little breaths… in… and out,
Let your worries drift about.

I’ll stay with you… nice and slow,
No need to hurry… nowhere to go.

Soft like fur… warm like a hug,
All cozy safe… and feeling snug.

I’m right beside you… yes it’s true…
All cozy here… with you, ${child}.`,
      happy: `Hi, ${child}… come play with me!
Let’s hop around… one, two, three!

Bounce bounce bounce… up we go,
Giggles start… and overflow!

Wiggle your nose… wiggle your feet,
Happy hops are oh so sweet!

Spin around… and clap-clap twice,
Playing with you feels so nice!

Jump a little… laugh out loud,
You make me so happy proud!

My happy friend, ${child}!`,
      brave: `Hey, ${child}… hop with me,
We’ll be brave… just wait and see!

One small hop… then one more too,
Brave gets bigger… inside you.

Even if you feel unsure,
You are strong… of that I’m sure.

Little steps… still count a lot,
You are braver than you thought!

I’ll stay with you… hop by hop,
We keep going… we don’t stop.

I believe in you, ${child}.`,
      sleepy: `Hi, ${child}… it’s time for bed,
Rest your body… rest your head.

Little bunny curls up tight,
Snuggled warm all through the night.

Close your eyes… soft and slow,
Dreamy thoughts begin to flow.

No more hopping… time to rest,
You are safe… you are blessed.

I’ll stay near… all night through,
Watching softly over you.

Goodnight, ${child}.`,
      comfort: `Oh, ${child}… come here with me,
You can sit… right by me.

If you’re sad… that’s okay,
I will stay… right here, I’ll stay.

Little breaths… in… and out,
Let your feelings move about.

You don’t have to feel alone,
You’ve got me… your bunny home.

I’ll stay close… through it all,
Big or small… I hear your call.

I’m right here, ${child}.`,
      curious: `Hey, ${child}… come hop with me!
Let’s explore… one, two, three!

What’s that sparkle? Did you see?
Something fun… for you and me!

Hop hop hop… let’s go find out,
Curious minds love to scout!

Little wonders everywhere,
Hidden magic here and there!

Sniff the air… and look around,
So much joy to be found!

My curious friend, ${child}!`
    },
    della: {
      calm: `${child}… come sit by me,
The pond is calm… as calm can be.

Soft little ripples… slow and light,
Everything here feels just right.

Take a breath… in… and out,
Let your worries drift about.

No need to hurry… you can stay,
Peace can grow in its own way.

I’m right here… nice and near,
You are safe… right here.

Calm is with you, ${child}.`,
      happy: `${child}… splash and play!
Joy is dancing here today!

Water sparkles… bright and free,
Happy lives in you and me!

Jump and wiggle… laugh out loud,
You are shining… happy and proud!

Ripples shimmer… fun won’t stop,
Every giggle goes plip-plop!

Stay and play… don’t run away,
I love this joy with you today!

My happy friend, ${child}!`,
      brave: `${child}… step by step,
You are stronger than you expect.

One small step… then one more too,
That is how brave grows in you.

Even when you feel unsure,
You are strong… of that I’m sure.

Take your time… you’ll find your way,
Brave gets bigger every day.

I’m right here… come what may,
I believe in you today.

You’ve got this, ${child}.`,
      sleepy: `${child}… evening’s near,
Soft and quiet all around here.

The pond is still… the sky is low,
Sleep is coming… soft and slow.

Close your eyes… drift away,
Dreams are on their way.

Snuggle in… safe and tight,
Resting softly through the night.

I’ll stay near… till morning light,
Everything will be alright.

Goodnight, ${child}.`,
      comfort: `${child}… stay with me,
Safe and calm is where you’ll be.

Take a breath… in… and out,
Let the heavy drift about.

You don’t have to feel alone,
You’ve got me… your pond home.

I’ll stay with you… nice and near,
You are safe… right here.

Little by little… you will see,
Comfort grows so gently.

I’m right here, ${child}.`,
      curious: `${child}… what’s that gleam?
Shiny ripples like a dream!

Come with me… let’s go see,
What this little glow could be.

Step by step… take a peek,
Wonder’s hiding where we seek.

Tiny treasures all around,
Magic waiting to be found!

Let’s explore… you and me,
There’s so much more to see!

My curious friend, ${child}.`
    }
  };

  return messages[plushie.id][momentId] || "A special moment just for you.";
}

export default function App() {
  const [name, setName] = useState("");
  const [momentId, setMomentId] = useState("calm");
  const [plushieId, setPlushieId] = useState("oli");
  const [generated, setGenerated] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  const plushie = plushies.find(p => p.id === plushieId) || plushies[0];

  const message = useMemo(() => buildMessage(name, momentId, plushie), [name, momentId, plushie]);
  const keepsakeRef = useRef<HTMLDivElement | null>(null);

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

const handleSaveKeepsake = async () => {
  alert("button clicked");

  if (!keepsakeRef.current) {
    alert("keepsakeRef is missing");
    return;
  }

  const canvas = await html2canvas(keepsakeRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "little-moment-keepsake.png";
  link.click();
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
          </div>

          <Button
            onClick={() => setGenerated(true)}
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
             <h2 className="text-xl mb-2 text-gray-800 text-center">{plushie.name} says:</h2>
<p className="text-sm text-gray-500 mb-4 text-center">A special little moment, just for you.</p>

<div
  ref={keepsakeRef}
  className="mx-auto w-full max-w-md aspect-[3/4] bg-contain bg-no-repeat bg-center relative"
  style={{ backgroundImage: "url('/keepsake-template.png')" }}
>
  <div className="absolute inset-[14%_12%_14%_12%] flex flex-col items-center justify-center text-center">
    <p className="text-sm text-gray-500 mb-2">This Little One Has a Message</p>

    <p className="text-base font-semibold text-gray-800 mb-4">
      {moments.find((m) => m.id === momentId)?.label}
    </p>

    <p className="whitespace-pre-line text-gray-700 leading-7 text-sm">
      {message}
    </p>

    <p className="mt-4 text-sm text-gray-600">— {plushie.name}</p>
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
  className="mt-6 w-full border border-[#E8AEB7] bg-white text-gray-700 hover:bg-[#EAF4EF] p-3 rounded-2xl"
>
  Create Another Moment
</Button>

<Button
  onClick={handleSaveKeepsake}
  className="mt-3 w-full bg-[#9FB7A3] text-white p-3 rounded-2xl"
>
  Save as a Keepsake
</Button>

<p className="mt-4 text-center text-sm text-gray-600">
  What {plushie.name} loves to say:{" "}
  {plushie.name === "Oli the Octopus"
    ? "Think it through, then we do."
    : plushie.name === "Sarah the Turtle"
    ? "Slow and steady feels just right."
    : plushie.name === "Bean the Bunny"
    ? "Hop with me, we'll find our glee!"
    : "Little by little, brave can be."}
</p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
