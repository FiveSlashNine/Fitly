import axios from 'axios';

//KARTELA ME OLA TA API CALLS

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//ΣΤΟΙΧΕΙΑ ΤΟΥ GYM
export interface Gym{
  id: number;
  name: string;
  location: string;
}
//ΣΤΟΙΧΕΙΑ ΤΟΥ GYM
export interface GymStatistics {
  totalSessions: number;
  totalParticipants: number;
  totalRevenue: number;
}
//ΣΤΟΙΧΕΙΑ ΤΟΥ ΧΡΗΣΤΗ
export interface User {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
}

//ΣΤΟΙΧΕΙΑ ΤΗΣ ΣΥΝΕΔΡΙΑΣ
export interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  cost: number;
  startTime: string;
  endTime: string;
  capacity: number;
  status: string;
  type: string;
  imageUrl: string;
  gym: Gym;
  sessionHolder: User[];
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΙΣ ΣΥΝΔΡΙΕΣ ΤΟΥ GYM 
export async function fetchAllSessionsByUserId(userId: number, token: string): Promise<Session[]> {
  const response = await axios.get(`${API_BASE_URL}/api/v1/sessions/getSessionsByOwnerId`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("📦 Received sessions:", response.data);
  return response.data;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΑΛΛΑΞΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ 
export async function updateSession(sessionId: number, sessionData: Omit<Session, 'id'>, token: string): Promise<Session> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/sessions/updateSession`,
    { id: sessionId, ...sessionData },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΔΙΑΓΡΑΦΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ
export async function deleteSession(sessionId: number, token: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/api/v1/sessions/deleteById`, {
    params: { id: sessionId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΔΗΜΙΟΥΡΓΗΣΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ
export async function createSession(
  session: Omit<Session, 'id' | 'gym' | 'sessionHolder'>,
  gymId: number,
  token: string
): Promise<Session> {
  console.log('Creating session with data:', {
    session,
    gymId,
    token: token ? 'present' : 'missing'
  });
  
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/sessions/createSession`,
    session,
    {
      params: { gymId: gymId },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
}

//ΣΥΑΝΡΤΗΣΗ ΝΑ ΠΑΙΡΝΕΙ ΤΟ ID ΤΟΥ GYM ΤΟΥ ΧΡΗΣΤΗ
export async function getGymIdByUserId(userId: number, token: string): Promise<number> {
  console.log('Getting gym ID for user:', userId);

  const response = await axios.get(`${API_BASE_URL}/api/v1/gyms/getGymByUserId`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Gym response:', response.data);
  return response.data.id;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΜΠΟΡΕΙ ΝΑ ΑΛΑΖΕΙ ΤΗΝ ΚΑΤΑΣΤΑΣΗ ΤΗΣ ΣΥΝΕΔΡΙΑΣ 
export async function updateSessionStatus(sessionId: number, newStatus: string, token: string): Promise<Session> {
  const response = await axios.put(`${API_BASE_URL}/api/v1/sessions/updateSessionStatus`, null, {
    params: { sessionid: sessionId, newStatus },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΟΥ ΣΥΜΜΕΤΕΧΟΝΤΕΣ ΜΙΑΣ ΣΥΝΕΔΡΙΑΣ 
export async function getSessionParticipants(sessionId:number  ,token:string):Promise<User[]>{
  const response = await axios.get(`${API_BASE_URL}/api/v1/sessions/getSessionUsers`,{
    params:{sessionId},
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return response.data;}

  //ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΑ ΣΑΤΙΣΤΙΚΑ 
  export async function fetchGymStatistics(gymId: number, token: string): Promise<GymStatistics> {
    const response = await axios.get(`${API_BASE_URL}/api/v1/gyms/getGymStatistics`, {
      params: { gymId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }