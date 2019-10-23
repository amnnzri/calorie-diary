export interface UserCredential {
  email: string;
  password: string;
}

export interface UserProfile {
  email: string;
  fullName: string;
}

export interface UserMenu {
  name: string;
  calories: number;
}

export interface UserFeed {
  height: number;
  weight: number;
  age: number;
  gender: boolean;   // false is female,true for male
  activityLevel: number;
}

export interface UserCalculations {
  bmiValue: number;
  bmrValue: number;
  dailyCalories: number;
}

export interface UserTrack {
  menuId: string;
  name: string;
  calories: number;
  quantity: number;
  date: Date;
}
