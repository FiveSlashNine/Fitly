import axios from "@/app/lib/axios";
import { Session } from "../types/session";
import { Gym, GymStatistics } from "../types/gym";
import { User } from "../types/user";

//KARTELA ME OLA TA API CALLS

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchSessionsParams {
  location?: string;
  type?: string;
  status?: string;
  searchQuery?: string;
  userId?: number;
  sort?: string;
  enrolledOnly?: boolean;
  ownedGymOnly?: boolean;
  page?: number;
  size?: number;
}

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
}

export const fetchSessions = async ({
  location,
  type,
  status,
  searchQuery,
  userId,
  sort,
  enrolledOnly = false,
  ownedGymOnly = false,
  page = 0,
  size = 10,
}: FetchSessionsParams = {}): Promise<PaginatedResponse<Session>> => {
  try {
    const params: Record<string, any> = {
      location,
      type,
      status,
      searchQuery,
      userId: userId === -1 ? null : userId,
      enrolledOnly,
      ownedGymOnly,
      page,
      size,
    };

    if (sort && sort !== "default") {
      params.sort = sort;
    }

    const response = await axios.get<PaginatedResponse<Session>>(
      `${API_BASE_URL}/api/v1/sessions/public/getSessions`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΑΛΛΑΞΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ
export async function updateSession(session: Session): Promise<Session> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/sessions/updateSession`,
    session
  );
  return response.data;
}
//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΔΙΑΓΡΑΦΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ
export async function deleteSession(sessionId: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/api/v1/sessions/deleteById`, {
    params: { id: sessionId },
  });
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΔΗΜΙΟΥΡΓΗΣΕΙ ΜΙΑ ΣΥΝΕΔΡΙΑ
export async function createSession(
  session: Omit<Session, "id" | "gym" | "sessionHolder">,
  gymId: number
): Promise<Session> {
  console.log("Creating session with data:", {
    session,
    gymId,
  });

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/sessions/createSession`,
    session,
    {
      params: { gymId: gymId },
    }
  );

  return response.data;
}

//ΣΥΑΝΡΤΗΣΗ ΝΑ ΠΑΙΡΝΕΙ ΤΟ ID ΤΟΥ GYM ΤΟΥ ΧΡΗΣΤΗ
export async function getGymIdByUserId(userId: number): Promise<number> {
  console.log("Getting gym ID for user:", userId);

  const response = await axios.get(
    `${API_BASE_URL}/api/v1/gyms/getGymByUserId`,
    {
      params: { userId },
    }
  );
  console.log("Gym response:", response.data);
  return response.data.id;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΟΥ ΣΥΜΜΕΤΕΧΟΝΤΕΣ ΜΙΑΣ ΣΥΝΕΔΡΙΑΣ
export async function getSessionParticipants(
  sessionId: number
): Promise<User[]> {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/sessions/getSessionUsers`,
    {
      params: { sessionId },
    }
  );
  return response.data;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΑ ΣΑΤΙΣΤΙΚΑ
export async function fetchGymStatistics(
  gymId: number
): Promise<GymStatistics> {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/gyms/getGymStatistics`,
    {
      params: { gymId },
    }
  );
  return response.data;
}

export async function bookSession(
  userId: number,
  sessionId: number
): Promise<User> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/users/updateUserSessionList`,
    {},
    { params: { userId, sessionId } }
  );
  return response.data;
}

export async function cancelBooking(
  userId: number,
  sessionId: number
): Promise<User> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/users/removeUserFromSession`,
    {},
    { params: { userId, sessionId } }
  );

  return response.data;
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    case "full":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΑ ΣΤΟΙΧΕΙΑ ΤΟΥ GYM
export async function getGymDetails(gymId: number): Promise<Gym> {
  const response = await axios.get(`${API_BASE_URL}/api/v1/gyms/getGymById`, {
    params: { id: gymId },
  });
  console.log("Gym details:", response.data);
  return response.data;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΑΛΛΑΓΗ ΤΩΝ ΣΤΟΙΧΕΙΩΝ ΤΟΥ GYM
export async function updateGymDetails(
  id: number,
  name: string,
  location: string
): Promise<Gym> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/gyms/updateGymCredentialsWithId`,
    {},
    {
      params: {
        id: id,
        gymname: name,
        gymLocation: location,
      },
    }
  );

  console.log("sessionHandler - Update response:", response.data);
  return response.data;
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΔΙΑΓΡΑΦΕΙ ΤΟ GYM ΑΠΟ ΤΟΝ ΧΡΗΣΤΗ ΟΧΙ ΟΛΟ ΤΟΝ ΧΡΗΣΤΗ
export async function deleteGym(gym: Gym): Promise<void> {
  await axios.delete(`${API_BASE_URL}/api/v1/gyms/deleteGym`, {
    data: gym,
  });
}

//ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΝΑ ΠΑΙΡΝΕΙ ΤΑ ΣΤΟΙΧΕΙΑ ΤΟΥ ΧΡΗΣΤΗ
export async function getUserDetails(userId: number): Promise<User> {
  const response = await axios.get(`${API_BASE_URL}/api/v1/users/getUserById`, {
    params: { id: userId },
  });
  return response.data;
}

export async function UpdateUserDetails(user: User): Promise<User> {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/users/updateUser`,
    user
  );
  return response.data;
}
