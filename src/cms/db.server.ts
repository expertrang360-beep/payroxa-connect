import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { INITIAL_CMS_DATABASE } from "./constants";
import type {
  CmsDatabaseState,
  CmsUser,
  SiteSettings,
  ApplicationLinks,
  SocialSettings,
  CmsActivityLog,
  AdminRole,
} from "./types";

const DB_DIR = path.resolve(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "cms-db.json");

let memoryDb: CmsDatabaseState | null = null;

function ensureDbDirectory() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create .data directory:", err);
  }
}

export function getCmsDb(): CmsDatabaseState {
  if (memoryDb) {
    return memoryDb;
  }

  ensureDbDirectory();

  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(data) as CmsDatabaseState;
      // Merge with initial in case new schema properties were added
      memoryDb = {
        ...INITIAL_CMS_DATABASE,
        ...parsed,
        settings: { ...INITIAL_CMS_DATABASE.settings, ...(parsed.settings || {}) },
        links: { ...INITIAL_CMS_DATABASE.links, ...(parsed.links || {}) },
        social: { ...INITIAL_CMS_DATABASE.social, ...(parsed.social || {}) },
        seo: { ...INITIAL_CMS_DATABASE.seo, ...(parsed.seo || {}) },
        blogPosts:
          parsed.blogPosts && parsed.blogPosts.length > 0
            ? parsed.blogPosts
            : INITIAL_CMS_DATABASE.blogPosts,
        blogCategories:
          parsed.blogCategories && parsed.blogCategories.length > 0
            ? parsed.blogCategories
            : INITIAL_CMS_DATABASE.blogCategories,
        blogAuthors:
          parsed.blogAuthors && parsed.blogAuthors.length > 0
            ? parsed.blogAuthors
            : INITIAL_CMS_DATABASE.blogAuthors,
        redirects:
          parsed.redirects && parsed.redirects.length > 0
            ? parsed.redirects
            : INITIAL_CMS_DATABASE.redirects,
        searchConsole: { ...INITIAL_CMS_DATABASE.searchConsole, ...(parsed.searchConsole || {}) },
      };
      return memoryDb;
    }
  } catch (err) {
    console.error("Error reading CMS DB file, falling back to default:", err);
  }

  memoryDb = JSON.parse(JSON.stringify(INITIAL_CMS_DATABASE));
  saveCmsDb(memoryDb!);
  return memoryDb!;
}

export function saveCmsDb(db: CmsDatabaseState): void {
  memoryDb = db;
  ensureDbDirectory();
  try {
    const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error("Error persisting CMS DB to file:", err);
  }
}

export function logActivity(
  action: CmsActivityLog["action"],
  description: string,
  user: { name: string; email: string },
  resourceType: string,
  resourceId?: string,
): void {
  const db = getCmsDb();
  const entry: CmsActivityLog = {
    id: `act_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    action,
    description,
    userName: user.name || "Administrator",
    userEmail: user.email || "admin@payroxa.com.ng",
    timestamp: new Date().toISOString(),
    resourceType,
    resourceId,
  };

  db.activities = [entry, ...(db.activities || [])].slice(0, 100);
  saveCmsDb(db);
}

// User Helpers
export function sanitizeUser(u: CmsUser & { passwordHash?: string }): CmsUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatarUrl: u.avatarUrl,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
  };
}

export function getCmsUsers(): CmsUser[] {
  const db = getCmsDb();
  return db.users.map(sanitizeUser);
}

export function findUserByEmail(email: string) {
  const db = getCmsDb();
  const cleanEmail = email.trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === cleanEmail);
}

export function findUserById(id: string) {
  const db = getCmsDb();
  return db.users.find((u) => u.id === id);
}

export function updateSiteSettings(
  settings: Partial<SiteSettings>,
  user: { name: string; email: string },
): SiteSettings {
  const db = getCmsDb();
  db.settings = {
    ...db.settings,
    ...settings,
    updatedAt: new Date().toISOString(),
    updatedBy: user.name || user.email,
  };

  logActivity(
    "settings_updated",
    `Updated general website settings (${Object.keys(settings).join(", ")})`,
    user,
    "settings",
  );

  saveCmsDb(db);
  return db.settings;
}

export function updateApplicationLinks(
  links: Partial<ApplicationLinks>,
  user: { name: string; email: string },
): ApplicationLinks {
  const db = getCmsDb();
  db.links = {
    ...db.links,
    ...links,
    updatedAt: new Date().toISOString(),
    updatedBy: user.name || user.email,
  };

  logActivity(
    "link_changed",
    `Updated application destination links (${Object.keys(links).join(", ")})`,
    user,
    "links",
  );

  saveCmsDb(db);
  return db.links;
}

export function updateSocialSettings(
  social: SocialSettings,
  user: { name: string; email: string },
): SocialSettings {
  const db = getCmsDb();
  db.social = {
    ...social,
    updatedAt: new Date().toISOString(),
    updatedBy: user.name || user.email,
  };

  logActivity("settings_updated", "Updated social media channel configurations", user, "social");

  saveCmsDb(db);
  return db.social;
}
