"use client";

import { useRef, useState } from "react";
import { Camera, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Resume } from "@/lib/schema";
import { Field, FormSection } from "./Field";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

interface ZipResult {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
}

function katakanaToHiragana(str: string): string {
  return str.replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

async function lookupPostalCode(raw: string): Promise<ZipResult | null> {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length !== 7) return null;
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
    const json = await res.json();
    if (json.status === 200 && json.results?.length) return json.results[0] as ZipResult;
  } catch {
    // network error — ignore
  }
  return null;
}

export function PersonalForm({ data, setData }: Props) {
  const p = data.personal;
  const fileRef = useRef<HTMLInputElement>(null);
  const [lookingUpMain, setLookingUpMain] = useState(false);
  const [lookingUpContact, setLookingUpContact] = useState(false);

  function update<K extends keyof Resume["personal"]>(key: K, value: Resume["personal"][K]) {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  }

  async function handlePostalCodeChange(raw: string) {
    update("postalCode", raw);
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits.length !== 7) return;
    setLookingUpMain(true);
    const result = await lookupPostalCode(raw);
    setLookingUpMain(false);
    if (!result) return;
    const address = result.address1 + result.address2 + result.address3;
    const furigana = katakanaToHiragana(result.kana1 + result.kana2 + result.kana3).toLowerCase();
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        address,
        furiganaAddress: furigana,
      },
    }));
  }

  async function handleContactPostalCodeChange(raw: string) {
    update("contactPostalCode", raw);
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits.length !== 7) return;
    setLookingUpContact(true);
    const result = await lookupPostalCode(raw);
    setLookingUpContact(false);
    if (!result) return;
    const address = result.address1 + result.address2 + result.address3;
    const furigana = katakanaToHiragana(result.kana1 + result.kana2 + result.kana3).toLowerCase();
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        contactAddress: address,
        furiganaContact: furigana,
      },
    }));
  }

  function onPhotoChange(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      update("photoDataUrl", typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      <FormSection
        title="Personal information"
        description="Top block of the rirekisho. You can write in any language — the Translate button will convert everything to Japanese for the final PDF."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name (氏名)">
            <Input
              value={p.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Smith John"
            />
          </Field>
          <Field label="Furigana (ふりがな)">
            <Input
              value={p.furiganaName}
              onChange={(e) => update("furiganaName", e.target.value)}
              placeholder="すみす じょん"
            />
          </Field>
          <Field label="Date of birth (生年月日)">
            <Input
              type="date"
              value={p.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
            />
          </Field>
          <Field label="Gender (性別)">
            <Select value={p.gender || undefined} onValueChange={(v) => update("gender", v as "male" | "female")}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男 / Male</SelectItem>
                <SelectItem value="female">女 / Female</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Nationality (国籍)" className="sm:col-span-2">
            <Input
              value={p.nationality}
              onChange={(e) => update("nationality", e.target.value)}
              placeholder="アメリカ / Nepal / 日本 ..."
            />
          </Field>
        </div>

        <div className="pt-2">
          <Field label="Photo (写真)" hint="JPEG/PNG · displayed in the photo cell at top-right">
            <div className="flex items-center gap-3">
              <div className="h-24 w-[72px] rounded-md border bg-zinc-50 overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
                {p.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photoDataUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onPhotoChange(e.target.files[0])}
                />
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
                  <Camera className="h-3.5 w-3.5" /> Upload photo
                </Button>
                {p.photoDataUrl && (
                  <Button size="sm" variant="ghost" onClick={() => update("photoDataUrl", "")}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </Button>
                )}
              </div>
            </div>
          </Field>
        </div>
      </FormSection>

      <FormSection title="Current address (現住所)">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <Field label="Furigana" className="sm:col-span-6">
            <Input
              value={p.furiganaAddress}
              onChange={(e) => update("furiganaAddress", e.target.value)}
              placeholder="とうきょうとちよだく ..."
            />
          </Field>
          <Field label="Postal code (〒)" className="sm:col-span-2">
            <div className="relative">
              <Input
                value={p.postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                placeholder="102-0072"
                className={lookingUpMain ? "pr-8" : ""}
              />
              {lookingUpMain && (
                <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </Field>
          <Field label="Address" className="sm:col-span-4">
            <Input
              value={p.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="東京都千代田区飯田橋..."
            />
          </Field>
          <Field label="Phone (電話)" className="sm:col-span-3">
            <Input
              value={p.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="090-0000-0000"
            />
          </Field>
          <Field label="Email (メールアドレス)" className="sm:col-span-3">
            <Input
              type="email"
              value={p.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Alternate contact (連絡先)"
        description="Only fill this if you want post/calls sent somewhere other than your current address."
      >
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={p.contactSameAsAbove}
            onChange={(e) => update("contactSameAsAbove", e.target.checked)}
            className="h-4 w-4"
          />
          Same as current address (renders 同上)
        </label>

        {!p.contactSameAsAbove && (
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
            <Field label="Furigana" className="sm:col-span-6">
              <Input
                value={p.furiganaContact}
                onChange={(e) => update("furiganaContact", e.target.value)}
              />
            </Field>
            <Field label="Postal code (〒)" className="sm:col-span-2">
              <div className="relative">
                <Input
                  value={p.contactPostalCode}
                  onChange={(e) => handleContactPostalCodeChange(e.target.value)}
                  placeholder="102-0072"
                  className={lookingUpContact ? "pr-8" : ""}
                />
                {lookingUpContact && (
                  <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </Field>
            <Field label="Address" className="sm:col-span-4">
              <Input
                value={p.contactAddress}
                onChange={(e) => update("contactAddress", e.target.value)}
              />
            </Field>
            <Field label="Phone" className="sm:col-span-3">
              <Input
                value={p.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
              />
            </Field>
            <Field label="Email" className="sm:col-span-3">
              <Input
                type="email"
                value={p.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
              />
            </Field>
          </div>
        )}
      </FormSection>
    </div>
  );
}
