
import { AuthResponse } from "@/lib/types";
import { atom } from "jotai";


export const userAtom= atom<AuthResponse | null>(null)