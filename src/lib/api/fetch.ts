import supabase from "./supabaseClient";

// Fetch all available houses (for tenants)
export const fetchAvailableHouses = async () => {
  try {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("is_available", true);

    if (error) {
      console.error("Error fetching available houses:", error.message);
      return [];
    }

    return data || [];
  } catch (err: any) {
    console.error("Unexpected error fetching houses:", err.message);
    return [];
  }
};

// Fetch houses owned by a specific landlord
export const fetchLandlordHouses = async (landlordId: string) => {
  try {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("owner_id", landlordId);

    if (error) {
      console.error("Error fetching landlord's houses:", error.message);
      return [];
    }

    return data || [];
  } catch (err: any) {
    console.error("Unexpected error fetching landlord houses:", err.message);
    return [];
  }
};