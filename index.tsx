import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

const BRAND = {
  background: "#FFF6EE",
  main: "#E8AEB7",
  cta: "#B76E79",
  secondary: "#9FB7A3",
  accent: "#BFA2D6",
  sparkle: "#F3D27A",
};

type MomentKey = "calm" | "happy" | "brave" | "sleepy" | "nervous" | "curious";

type Plushie = {
  id: string;
  name: string;
  emoji: string;
  signatureLine: string;
  poems: Record<MomentKey, (child: string, closing?: string) => string>;
};

const plushies: Plushie[] = [
  {
    id: "oli",
    name: "Oli the Octopus",
    emoji: "🐙",
    signatureLine: "Think it through, then we do.",
    poems: {
      calm: (child) => `Hey there, ${child}… come close to me,
My arms are warm… like the quiet sea.

Slow little breaths… in… and out,
Let all your busy feelings drift out.

No need to hurry… no need to go,
We can sit… nice and slow.

The water hums… soft and deep,
A cozy place your heart can keep.

I've got you safe… I've got you near,
You can be still… I'm right here.

Just you and me… calm and free…
Resting together… quietly.

You're safe with me… as safe can be…
I'm right here… ${child}.`,
      happy: (child) => `Hi, hi, ${child}… I see your smile!
Let's be silly… for a while!

Wiggle your fingers… wiggle your toes,
Giggles start… and up they go!

Clap-clap your hands… spin around,
Let your happy… bubble sound!

The waves go splash… the bubbles pop,
Joy goes up… and doesn't stop!

Jump a little… laugh out loud,
Shine your bright… and happy proud!

You bring sunshine… everywhere,
I feel your joy… floating in the air.

Stay right here… and play with me…
My joyful friend… ${child}!`,
      brave: (child) => `Hey, ${child}… come take my hand,
We'll be brave… just like we planned.

One small step… then one more too,
That's how brave… grows inside you.

If it feels big… that's okay,
Brave shows up… anyway.

I see your strength… soft and true,
Growing stronger… inside you.

If you feel wobbly… I'll stay near,
You're not alone… I'm right here.

Step by step… you'll find your way,
I'll be with you… all the way.

You can do this… yes you can…
I believe in you… ${child}.`,
      sleepy: (child) => `Shhh now, ${child}… it's time for rest,
Snuggle in… you are safe and blessed.

The ocean's slow… the moon is high,
Sleep is drifting… gently by.

Close your eyes… soft and deep,
Let your body… fall to sleep.

The waves say hush… the stars glow low,
Nighttime wraps you… nice and slow.

I'll stay with you… the whole night through,
Watching over… only you.

Drift away… on dreams so light,
Floating softly… through the night.

I'm right here… till morning light…
Sweet dreams, my friend… ${child}.`,
      nervous: (child) => `Oh, ${child}… come here to me,
It's okay… to feel wobbly.

Big feelings come… and big feelings go,
Let's sit together… nice and slow.

Take a breath… in… and out,
Let the heavy… drift about.

You don't have to… hold it tight,
We can sit… until it's light.

I'm right beside you… calm and near,
You are safe… right here.

Nothing you feel… is ever wrong,
I'll stay with you… as long as long.

You are loved… just as you are…
My gentle friend… ${child}.`,
      curious: (child) => `Hey, ${child}… did you see that glow?
Come with me… let's go slow.

Tiny lights… and bubbles bright,
Dancing softly… in the night.

What could it be?… let's take a peek,
There's something fun… for us to seek!

The world is full… of things to find,
Little wonders… of every kind.

Ask your questions… look around,
Magic lives… in what we've found.

Step by step… come along with me,
There's so much more… to see and be.

Let's explore… just you and me…
My curious friend… ${child}.`,
    },
  },
  {
    id: "sarah",
    name: "Sarah the Turtle",
    emoji: "🐢",
    signatureLine: "Slow and steady feels just right.",
    poems: {
      calm: (child) => `Hello, ${child}… come close to me,
We can rest by the quiet sea.

Slow and steady… in… and out,
Let your body soften all about.

No need to hurry… no need to go,
We can sit… nice and slow.

The tide moves gently… back and forth,
Carrying calm from south to north.

I'm right beside you… safe and near,
You can relax… I'm right here.

Just like the ocean… calm and true…
I'll stay right here… with you, ${child}.`,
      happy: (child) => `Hello, ${child}… I see your light,
You're shining warm… and shining bright.

Let's move gently… side to side,
Like little waves upon the tide.

Smile so softly… feel it grow,
A happy glow… nice and slow.

Joy can be quiet… calm and sweet,
Like soft sea ripples at your feet.

I feel your happiness… shining through,
A gentle glow… that comes from you.

Stay here with me… peaceful and free…
My shining friend… ${child}.`,
      brave: (child) => `Hello, ${child}… stay close to me,
We'll move like turtles… patiently.

One slow step… then one more too,
That's how strength grows inside you.

No need to rush… you're doing fine,
Each small step… is a brave sign.

Even slow… is strong and true,
Strong lives quietly… inside you.

I'm right beside you… all the way,
You are safe… as you go today.

Slow and steady… strong and true…
I believe in you… ${child}.`,
      sleepy: (child) => `Hello, ${child}… it's time to rest,
Come in close… you are safe and blessed.

The tide is slow… the world is still,
Sleep will come… soft and gentle.

Close your eyes… drift down deep,
Let your body… fall to sleep.

The ocean rocks… side to side,
Like a cradle… on the tide.

I'll stay with you… the whole night through,
Watching softly… over you.

Slow and steady… drift so light…
Goodnight, dear ${child}… goodnight.`,
      nervous: (child) => `Oh, ${child}… come close to me,
You are safe… as safe can be.

We can sit… and take our time,
Let your feelings… gently unwind.

Slow and steady… in… and out,
Let the heavy… float about.

Nothing you feel… is ever wrong,
I'll stay with you… as long as long.

I'm right beside you… calm and near,
You are held… right here.

Take your time… just as you are…
I'm here with you… ${child}.`,
      curious: (child) => `Hello, ${child}… come with me,
Let's explore… the quiet sea.

Slow and steady… look around,
There is wonder… to be found.

Tiny lights… so soft and low,
Watch them shimmer… watch them glow.

No need to rush… we'll take it slow,
There's so much here… to gently know.

Step by step… side by side,
We'll explore… the ocean wide.

Come along… just you and me…
My curious friend… ${child}.`,
    },
  },
  {
    id: "bean",
    name: "Bean the Bunny",
    emoji: "🐰",
    signatureLine: "Hop with me, we'll find our glee!",
    poems: {
      calm: (child) => `Hi, ${child}… come snuggle near,
I'll sit right close… right here, right here.

We can tuck in… soft and tight,
Everything's calm… everything's right.

Little breaths… in… and out,
Let your worries drift about.

I'll stay with you… nice and slow,
No need to hurry… nowhere to go.

Soft like fur… warm like a hug,
All cozy safe… and feeling snug.

I'm right beside you… yes it's true…
All cozy here… with you, ${child}.`,
      happy: (child) => `Hi, ${child}… come play with me!
Let's hop around… one, two, three!

Bounce bounce bounce… up we go,
Giggles start… and overflow!

Wiggle your nose… wiggle your feet,
Happy hops are oh so sweet!

Spin around… and clap-clap twice,
Playing with you feels so nice!

Jump a little… laugh out loud,
You make Bean so happy proud!

Stay and play… don't go away…
My happy friend… ${child}!`,
      brave: (child) => `Hey, ${child}… hop with me,
We'll be brave… just wait and see!

One small hop… then one more too,
Brave gets bigger… inside you.

Even if you feel unsure,
You are strong… of that I'm sure.

Little steps… still count a lot,
You are braver than you thought!

I'll stay with you… hop by hop,
We keep going… we don't stop.

You've got this… yes you do…
I believe in you… ${child}.`,
      sleepy: (child) => `Hi, ${child}… it's time for bed,
Rest your body… rest your head.

Little bunny curls up tight,
Snuggled warm all through the night.

Close your eyes… soft and slow,
Dreamy thoughts begin to flow.

No more hopping… time to rest,
You are safe… you are blessed.

I'll stay near… all night through,
Watching softly… over you.

Sleep so sweet… till morning light…
Goodnight, dear ${child}… goodnight.`,
      nervous: (child) => `Oh, ${child}… come here with me,
You can sit… right by my knee.

If you're sad… that's okay,
I will stay… right here, I'll stay.

Little breaths… in… and out,
Let your feelings move about.

You don't have to feel alone,
You've got me… your bunny home.

I'll stay close… through it all,
Big or small… I hear your call.

You are loved… yes it's true…
I'm right here… ${child}.`,
      curious: (child) => `Hey, ${child}… come hop with me!
Let's explore… one, two, three!

What's that sparkle? Did you see?
Something fun… for you and me!

Hop hop hop… let's go find out,
Curious minds love to scout!

Little wonders everywhere,
Hidden magic… here and there!

Sniff the air… and look around,
So much joy… to be found!

Come along… don't stay behind…
My curious friend… ${child}!`,
    },
  },
  {
    id: "della",
    name: "Della the Duck",
    emoji: "🦆",
    signatureLine: "Little by little, brave can be.",
    poems: {
      calm: (child, closing = "peace") => `By the pond so still and clear,
Della waddles softly near.

Gentle steps can guide the way,
Calm can grow a little each day.

Little ripples softly sing,
Peace can be a quiet thing.

Soft and safe as you can be,
${child} feels ${closing} with me.`,
      happy: (child) => `Splash and wiggle, laugh and play,
Della dances through the day.

Come along and laugh with me,
Happy can be wild and free.

Water sparkles in the sun,
Little giggles, lots of fun.

With a splash of joy and glee,
${child} laughs along with me.`,
      brave: (child) => `Past the reeds and round the bend,
Della says, be brave, my friend.

Try one step, then one more too,
Brave is growing inside you.

Tiny steps can take you far,
Steady courage is your star.

With a quack of bravery,
${child} stands strong with me.`,
      sleepy: (child, closing = "rest") => `Evening on the pond is still,
Della hums beyond the hill.

Close your eyes and snuggle deep,
Quiet songs can carry sleep.

Feathers warm and water slow,
Dreams arrive so soft and low.

Snug and safe as can be,
${child} drifts to ${closing} with me.`,
      nervous: (child, closing = "comfort") => `When the water feels too wide,
Della stays right by your side.

We can pause and breathe in slow,
Little calm can help you go.

In and out, the ripples fade,
Gentle courage can be made.

Close together, safe and free,
${child} finds ${closing} with me.`,
      curious: (child) => `Round the pond and through the reeds,
Della follows little leads.

What's that there? Let's go and see,
Every step's discovery.

Shiny stones and hidden things,
Wonder grows on tiny wings.

With a quack of curiosity,
${child} explores with me.`,
    },
  },
];

function buildPoem(name: string, plushie: Plushie, feeling: string): string {
  const child = name.trim() || "Little Friend";
  const mood = (feeling || "calm").toLowerCase().trim() as MomentKey;
  const closingMap: Record<MomentKey, string> = {
    sleepy: "rest",
    brave: "courage",
    happy: "joy",
    calm: "peace",
    nervous: "comfort",
    curious: "wonder",
  };
  const closing = closingMap[mood] || "peace";
  const poemFn = plushie.poems[mood] || plushie.poems.calm;
  return poemFn(child, closing);
}

function buildTitle(childName: string, plushie: Plushie, feeling: string): string {
  const child = childName.trim() || "A Little One";
  const mood = (feeling || "calm").toLowerCase().trim();
  const titleMap: Record<string, string> = {
    sleepy: `${child} & ${plushie.name}'s Quiet Night`,
    brave: `${child} & ${plushie.name}'s Brave Moment`,
    happy: `${child} & ${plushie.name}'s Happy Day`,
    calm: `${child} & ${plushie.name}'s Gentle Moment`,
    nervous: `${child} & ${plushie.name}'s Comforting Moment`,
    curious: `${child} & ${plushie.name}'s Little Wonder`,
  };
  return titleMap[mood] || `${child} & ${plushie.name}'s Story Moment`;
}

const momentOptions: Array<[MomentKey, string]> = [
  ["calm", "Calm & Cozy"],
  ["happy", "Happy & Joyful"],
  ["brave", "Brave & Strong"],
  ["sleepy", "Sleepy & Bedtime"],
  ["nervous", "Gentle Comfort"],
  ["curious", "Curious & Wonder"],
];

export default function App() {
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [introComplete, setIntroComplete] = useState<boolean>(() => {
    try {
      return typeof window !== "undefined" && window.localStorage.getItem("lydibug_intro_done") === "true";
    } catch {
      return false;
    }
  });
  const [introEmail, setIntroEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState<MomentKey>("calm");
  const [plushieId, setPlushieId] = useState("oli");
  const [generated, setGenerated] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [lockedPoem, setLockedPoem] = useState("");
  const [lockedTitle, setLockedTitle] = useState("");

  const plushie = useMemo<Plushie>(() => {
    return plushies.find((p) => p.id === plushieId) ?? plushies[0];
  }, [plushieId]);

  const fullPoem = useMemo(() => {
    return buildPoem(name, plushie, selectedFeeling);
  }, [name, plushie, selectedFeeling]);

  const title = useMemo(() => {
    return buildTitle(name, plushie, selectedFeeling);
  }, [name, plushie, selectedFeeling]);

  const displayedTitle = lockedTitle || title;
  const displayedPoem = lockedPoem || fullPoem;

  function handleGenerate(): void {
    setGenerated(true);
    setLockedPoem("");
    setLockedTitle("");
  }

  function handleReset(): void {
    setName("");
    setSelectedFeeling("calm");
    setPlushieId("oli");
    setGenerated(false);
    setLockedPoem("");
    setLockedTitle("");
  }

  function handleIntroContinue(): void {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lydibug_intro_done", "true");
      }
    } catch {
      // ignore storage failures in preview environments
    }
    setIntroComplete(true);
  }

  function handleEmailBlur(): void {
    if (email.trim() && !emailCaptured) {
      setEmailCaptured(true);
    }
  }

  if (!introComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF6EE] p-6">
        <Card className="max-w-md w-full rounded-3xl shadow-xl border border-[#E8AEB7]">
          <CardHeader>
            <CardTitle className="text-2xl">✨ Welcome to Stitch & Tales</CardTitle>
            <p className="text-sm text-gray-600">A special message experience for your little one</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              This little friend comes with messages you can read together anytime. Add this to your phone for easy access,
              so it's always there when you need a special moment.
            </p>

            <div>
              <Label>Get your child's first special message</Label>
              <Input value={introEmail} onChange={(e) => setIntroEmail(e.target.value)} placeholder="Enter your email to begin" />
              <p className="text-xs text-gray-600 mt-1">Only needed once — then it's yours forever</p>
            </div>

            <Button
              disabled={!introEmail.trim()}
              onClick={handleIntroContinue}
              className="w-full bg-[#9FB7A3] hover:bg-[#8FA89A] text-white rounded-2xl"
            >
              Continue
            </Button>

            <p className="text-xs text-gray-600 text-center">Tip: Add this to your home screen for easy access later 📱</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6EE] p-6">
      <div className="max-w-5xl mx-auto mb-4 flex justify-end">
        <Button variant="outline" className="rounded-2xl border-[#E8AEB7] text-gray-700 bg-white hover:bg-[#EAF4EF]" onClick={() => setShowInstallHelp(true)}>
          📱 Add to Home Screen
        </Button>
      </div>

      {showInstallHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-[#E8AEB7]">
            <h2 className="text-xl font-semibold mb-3">📱 Add to Your Phone</h2>
            <p className="text-sm mb-3 text-gray-600">Save this so you can use it anytime.</p>
            <div className="text-sm space-y-3 text-gray-700">
              <div>
                <strong>iPhone (Safari)</strong>
                <p>Tap the share button → scroll → Add to Home Screen</p>
              </div>
              <div>
                <strong>Android</strong>
                <p>Tap the 3 dots → Add to Home screen or Install App</p>
              </div>
            </div>
            <Button className="mt-4 w-full bg-[#9FB7A3] hover:bg-[#8FA89A] text-white rounded-2xl" onClick={() => setShowInstallHelp(false)}>
              Got it
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
        <Card className="rounded-3xl shadow-xl border border-[#E8AEB7]">
          <CardHeader>
            <CardTitle className="text-3xl">✨ This Little One Has a Message for You</CardTitle>
            <p className="text-sm text-gray-600">Create a special moment together, anytime you need it</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Child's Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>What kind of moment are we creating?</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {momentOptions.map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    variant={selectedFeeling === value ? "default" : "outline"}
                    onClick={() => setSelectedFeeling(value)}
                    className={
                      (selectedFeeling === value
                        ? "bg-[#9FB7A3] hover:bg-[#8FA89A] text-white"
                        : "bg-white border border-[#E8AEB7] text-gray-700 hover:bg-[#EAF4EF]") +
                      " rounded-2xl whitespace-normal break-words text-center text-sm leading-tight px-2 py-2 min-h-[44px] flex items-center justify-center"
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Your Little Friend</Label>
              <div className="grid grid-cols-2 gap-2">
                {plushies.map((p) => (
                  <Button
                    key={p.id}
                    variant={plushieId === p.id ? "default" : "outline"}
                    onClick={() => setPlushieId(p.id)}
                    className={
                      plushieId === p.id
                        ? "bg-[#9FB7A3] hover:bg-[#8FA89A] text-white rounded-2xl"
                        : "bg-white border border-[#E8AEB7] text-gray-700 hover:bg-[#EAF4EF] rounded-2xl"
                    }
                  >
                    {p.emoji} {p.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full bg-[#9FB7A3] hover:bg-[#8FA89A] text-white rounded-2xl">
              ✨ Create Their Message
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl bg-white/90 border border-[#E8AEB7]">
          <CardHeader>
            <CardTitle>{displayedTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {generated ? (
              <>
                {!emailCaptured && (
                  <div className="mt-4 space-y-2">
                    <Label>Want to keep this for later?</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      placeholder="Enter your email (optional)"
                    />
                  </div>
                )}

                <div className="relative p-6 rounded-3xl border-2 border-dashed border-[#E8AEB7] bg-gradient-to-br from-[#EAF4EF] via-[#DDEEE6] to-[#EAF4EF] shadow-lg max-w-md mx-auto mt-4">
                  <span className="absolute -top-2 -left-2 text-xl" style={{ color: BRAND.sparkle }}>
                    ✨
                  </span>
                  <span className="absolute -bottom-2 -right-2 text-xl" style={{ color: BRAND.sparkle }}>
                    🌟
                  </span>

                  <div className="bg-white/85 rounded-2xl p-5 border border-[#E8AEB7]">
                    <p className="leading-6 whitespace-pre-line text-center text-gray-700 font-medium">{displayedPoem}</p>
                  </div>
                </div>

                <div className="mt-6 text-center space-y-3">
                  <p className="text-sm text-gray-600">Follow along for new little stories and friends</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <Button
                      variant="outline"
                      className="border-[#E8AEB7] text-gray-700 bg-white hover:bg-[#EAF4EF] rounded-2xl"
                      onClick={() => window.open("https://www.facebook.com", "_blank")}
                    >
                      Facebook Page
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#E8AEB7] text-gray-700 bg-white hover:bg-[#EAF4EF] rounded-2xl"
                      onClick={() => window.open("https://www.instagram.com", "_blank")}
                    >
                      Instagram
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full border-[#E8AEB7] text-gray-700 bg-white hover:bg-[#EAF4EF] rounded-2xl" onClick={handleReset}>
                    Create Another Moment
                  </Button>
                </div>

                <div className="mt-4 grid gap-3">
                  <Button variant="outline" className="w-full bg-white border border-[#E8AEB7] text-gray-700 hover:bg-[#EAF4EF] rounded-2xl" onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" /> Save as a Keepsake
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">{plushie.name} loves to say:</p>
                  <p className="text-lg font-semibold text-[#B76E79] mt-1">“{plushie.signatureLine}”</p>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Your little friend is ready whenever you are.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
