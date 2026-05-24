"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveProfile, ProfileData } from "@/actions/profile";
import { ArrowRight, ArrowLeft, CheckCircle2, User, MapPin, GraduationCap, IndianRupee, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh","Other"];
const EDUCATION_LEVELS = ["8th Pass","10th Pass","12th Pass","Diploma","ITI","Graduate (BA/BSc/BCom/BCA/BBA)","B.Tech/BE","Postgraduate (MA/MSc/MCom)","M.Tech/ME","MBA","PhD","Other"];
const STREAMS = ["Science (PCM)","Science (PCB)","Commerce","Arts/Humanities","Engineering","Computer Science","Medical","Management","Law","Education","Agriculture","Other"];
const CATEGORIES = ["General","OBC","SC","ST","EWS"];
const INTERESTS = ["Coding/Technology","Design","Teaching","Healthcare","Agriculture","Business/Entrepreneurship","Government Jobs","Arts/Media","Sports","Research","Finance","Other"];
const GOALS = ["Get a scholarship","Find a job","Find an internship","Start a business","Learn new skills","Prepare for government exam","Higher education","Other"];

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Education", icon: GraduationCap },
  { id: 4, label: "Background", icon: IndianRupee },
  { id: 5, label: "Goals", icon: Target },
];

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<ProfileData>({
    name: "",
    age: undefined,
    state: "",
    district: "",
    education: "",
    stream: "",
    category: "",
    annualIncome: undefined,
    employed: false,
    interests: [],
    goals: [],
  });

  const update = (key: keyof ProfileData, value: any) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key: "interests" | "goals", val: string) => {
    const arr = (data[key] as string[]) || [];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile(data);
      router.push("/chat");
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🦅</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Set Up Your Profile</h1>
          <p className="text-muted-foreground text-sm">Help Udaan AI give you personalized guidance</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  s.id === step
                    ? "bg-primary text-primary-foreground scale-110"
                    : s.id < step
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s.id < step ? <CheckCircle2 className="h-4 w-4" /> : s.id}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("h-0.5 w-6", s.id < step ? "bg-primary/40" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card border border-border/40 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-5 flex items-center gap-2">
            {(() => { const S = STEPS[step - 1]; return <S.icon className="h-4 w-4 text-primary" />; })()}
            {STEPS[step - 1].label}
          </h2>

          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Name *</label>
                <input
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Ravi Kumar"
                  value={data.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Age</label>
                <input
                  type="number"
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. 19"
                  value={data.age || ""}
                  onChange={(e) => update("age", parseInt(e.target.value) || undefined)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Category *</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => update("category", c)}
                      className={cn(
                        "py-2 rounded-lg border text-xs font-medium transition-all",
                        data.category === c
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">State *</label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={data.state || ""}
                  onChange={(e) => update("state", e.target.value)}
                >
                  <option value="">Select your state</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">District / City</label>
                <input
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Patna, Varanasi"
                  value={data.district || ""}
                  onChange={(e) => update("district", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Highest Education *</label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={data.education || ""}
                  onChange={(e) => update("education", e.target.value)}
                >
                  <option value="">Select education level</option>
                  {EDUCATION_LEVELS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Stream / Field</label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={data.stream || ""}
                  onChange={(e) => update("stream", e.target.value)}
                >
                  <option value="">Select your stream</option>
                  {STREAMS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Income */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Annual Family Income (₹)</label>
                <input
                  type="number"
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. 200000"
                  value={data.annualIncome || ""}
                  onChange={(e) => update("annualIncome", parseInt(e.target.value) || undefined)}
                />
                <p className="text-[10px] text-muted-foreground mt-1">Used to match you with income-based schemes. Never shared.</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Are you currently employed?</label>
                <div className="flex gap-3">
                  {[false, true].map((v) => (
                    <button
                      key={String(v)}
                      onClick={() => update("employed", v)}
                      className={cn(
                        "flex-1 py-2 rounded-lg border text-sm font-medium transition-all",
                        data.employed === v
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      {v ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Areas of Interest (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleArray("interests", interest)}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-xs transition-all",
                        (data.interests as string[])?.includes(interest)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {step === 5 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">What are you looking for? (select all that apply)</p>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleArray("goals", goal)}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-xs transition-all",
                      (data.goals as string[])?.includes(goal)
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step < 5 ? (
              <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-primary hover:bg-primary/90 saffron-glow"
              >
                {saving ? "Saving..." : "Start My Udaan 🚀"}
              </Button>
            )}
          </div>

          {step < 5 && (
            <button
              onClick={() => router.push("/chat")}
              className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
