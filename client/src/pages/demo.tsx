import { useState } from 'react';
import { Switch } from '../components/atoms/Switch/Switch';
import { Button } from '../components/atoms/Button/Button';
import { Input } from '../components/atoms/Input/Input';
import { TextArea } from '../components/atoms/TextArea/TextArea';
import { TextDisplay } from '../components/atoms/TextDisplay/TextDisplay';
import { Card } from '../components/atoms/Card/Card';
import { CodeBlock } from '../components/atoms/CodeBlock/CodeBlock';
import { Checkbox } from '../components/atoms/CheckBox/CheckBox';
import { Tag } from '../components/atoms/Tag/Tag';
import {
  ShieldAlert,
  CheckCircle,
  Hash,
  Tag as TagIcon,
  Plus
} from 'lucide-react';
import { ToolTip } from '../components/atoms/ToolTip/ToolTip';


const IconSearch = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconMail = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconLock = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconRocket = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"></path><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"></path></svg>;
const IconCheck = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const IconX = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconMoon = () => <span>🌙</span>;
const IconSun = () => <span>☀️</span>;
const IconTerminal = () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;

const jsonConfig = `{
  "app_mode": "production",
  "max_retries": 5,
  "features": [
    "ssr",
    "pwa"
  ],
  "is_active": true,
  "cache_ttl": null
}`;


export const Demo = () => {
  const [modulesEnabled, setModulesEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] p-6 md:p-12 font-sans flex flex-col gap-12 relative overflow-hidden">

      {/* TŁO DEKORACYJNE */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0077B6] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#90E0EF] rounded-full blur-[100px] opacity-5 pointer-events-none"></div>

      <header className="relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-[#0077B6]">UI Kit <span className="text-white">Preview</span></h1>
        <p className="text-[#696b6d]">Design System v2.1: Added TextDisplay & Syntax Highlighting</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

        <div className="flex flex-col gap-8">

          <Card variant="levitating" interactive className="border-l-4 border-l-[#0077B6]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0077B6]/20 text-[#0077B6] rounded-lg">
                <IconRocket />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Ocean Blue Theme</h3>
                <p className="text-[#aaa] text-sm leading-relaxed">
                  System gotowy do użycia. Sprawdź nowe cienie i oświetlenie krawędzi (rim-light).
                </p>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#292a2b] pb-2">
              Panel Logowania
            </h3>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <Input label="E-mail" placeholder="name@example.com" leftIcon={<IconMail />} fullWidth />
              <Input type="password" label="Hasło" placeholder="••••••••" leftIcon={<IconLock />} fullWidth />
              <div className="flex items-center justify-between mt-2">
                <Switch size="sm" label="Zapamiętaj mnie" />
                <a href="#" className="text-sm text-[#0077B6] hover:underline">Odzyskaj hasło</a>
              </div>
              <Button variant="primary" fullWidth size="lg" isLoading={isLoading} onClick={handleSimulateLoad} className="mt-4">
                Zaloguj się
              </Button>
            </form>
            <div className="flex flex-col gap-2 mt-2">
              <Checkbox
                label="Akceptuję regulamin (Primary)"
                defaultChecked
              />

              <Checkbox
                label="Zgoda marketingowa (Success Color)"
                colorChecked="#9ece6a" // $tn-green
              />

              <Checkbox
                label="Wymagane pole (Błąd)"
                error
              />

              <Checkbox
                label="Opcja nieaktywna"
                disabled
              />
            </div>
          </Card>

          <Card variant="flat" padding="lg" className="border border-[#292a2b]">
            <div className="flex items-center gap-3 mb-4">
              <IconTerminal />
              <h3 className="text-lg font-bold text-[#e0e0e0]">System Output</h3>
            </div>

            <div className="flex flex-col gap-6">
              <TextDisplay
                label="Server Logs"
                state="error"
                maxHeight="120px"
                helperText="Ostatnia aktualizacja: 2s temu"
              >
                {`[2026-01-10 14:23:01] INFO: Starting services...
[2026-01-10 14:23:02] WARN: Deprecated API usage detected
[2026-01-10 14:23:05] ERROR: Connection timeout to DB_SHARD_04
[2026-01-10 14:23:05] CRITICAL: Retry limit reached. Aborting.`}
              </TextDisplay>

              <TextDisplay
                label="User Config (JSON Auto-Highlight)"
                state="success"
                helperText="Skopiuj konfigurację, aby użyć jej w .env"
              >
                <CodeBlock code={jsonConfig} />
              </TextDisplay>
            </div>
          </Card>

        </div>

        <div className="flex flex-col gap-8">

          <Card variant="flat" padding="md">
            <h4 className="text-sm font-bold text-[#696b6d] uppercase mb-4 tracking-wider">Kontrolki</h4>
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center justify-between">
                <span>Tryb ciemny</span>
                <Switch size="md" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} iconOff={<IconSun />} iconOn={<IconMoon />} />
              </div>
            </div>

            <h4 className="text-sm font-bold text-[#696b6d] uppercase mb-4 tracking-wider">Przyciski</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Save</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="outline">View</Button>
              <Button variant="danger">Delete</Button>
              <Button variant="purple">Delete</Button>
              <Button variant="success">Delete</Button>
            </div>

            <h4 className="text-sm font-bold text-[#696b6d] uppercase mb-4 tracking-wider">Przyciski</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary">Save</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="outline">View</Button>
            </div>

            <h4 className="text-sm font-bold text-[#696b6d] uppercase mb-4 tracking-wider">Tagi & Statusy</h4>

            <div className="flex flex-wrap gap-2 mb-4">
              <Tag variant="default" icon={<Hash size={12} />}>v2.1.0</Tag>
              <Tag variant="primary" icon={<TagIcon size={12} />}>Design System</Tag>
              <Tag variant="success" icon={<CheckCircle size={14} />}>Verified</Tag>
              <Tag variant="warning">Beta Feature</Tag>
              <Tag variant="danger" icon={<ShieldAlert size={14} />}>Deprecated</Tag>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Tag
                variant="info"
                size="sm"
                onDismiss={() => alert('Filtr usunięty!')}
              >
                Filter: Active
              </Tag>

              <Tag
                variant="default"
                size="sm"
                clickable
                icon={<Plus size={12} />}
                onClick={() => alert('Add new tag...')}
                className="border-dashed"
              >
                Add Tag
              </Tag>

              <Tag variant="primary" size="lg" onDismiss={() => { }}>
                Big Badge
              </Tag>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">

              <ToolTip content="Wersja systemu" position="top">
                <Tag variant="default" icon={<Hash size={12} />}>v2.1.0</Tag>
              </ToolTip>

              <ToolTip content="Moduł zweryfikowany" position="bottom">
                <Tag variant="success" icon={<CheckCircle size={14} />}>Verified</Tag>
              </ToolTip>

              <ToolTip content="Funkcja eksperymentalna!" position="right" delay>
                <Tag variant="warning">Beta Feature</Tag>
              </ToolTip>

            </div>

            <div className="flex justify-end mt-4">
              <ToolTip content="Kliknij, aby wysłać dane na serwer" position="left">
                <Button variant="primary" rightIcon={<IconRocket />}>Wyślij zgłoszenie</Button>
              </ToolTip>
            </div>
          </Card>

          <Card variant="transparent" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📝</span>
              <h3 className="text-lg font-bold text-white">Strefa Feedbacku</h3>
            </div>

            <div className="flex flex-col gap-6">
              <Input
                placeholder="Temat zgłoszenia..."
                fullWidth
                className="bg-black/20"
              />

              <TextArea
                label="Opis sytuacji"
                placeholder="Napisz nam, co się stało..."
                helperText="Wspieramy formatowanie Markdown."
                fullWidth
                rows={4}
              />

              <TextArea
                label="Wymagane kroki (Symulacja błędu)"
                placeholder="Ten opis jest za krótki..."
                error="To pole jest wymagane!"
                fullWidth
                rows={2}
              />

              <div className="flex justify-end">
                <Button variant="primary" rightIcon={<IconRocket />}>Wyślij zgłoszenie</Button>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
