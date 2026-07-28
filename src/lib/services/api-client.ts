export interface BackendState {
  active_module: string;
  active_role: string;
  house_id: string;
  house_name: string;
  my25_validation_code: string;
  compliance_status: string;
  residents: any[];
  wallet: any;
  inventory: any[];
  qr_logs: any[];
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function fetchBackendState(): Promise<BackendState | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/state`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (e) {
    return null; // Fallback to client mock state
  }
}

export async function selectBackendModule(moduleName: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/module/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module: moduleName })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function selectBackendRole(roleName: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/rbac/role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleName })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function addBackendQRLog(logEntry: any): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/qr-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: logEntry })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
