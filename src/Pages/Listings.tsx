import React, { useEffect, useState } from "react";
import supabase from "../api/supabaseClient";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  image_url: string;
}

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties") // make sure you have a "properties" table
      .select("*");

    if (error) {
      console.error("Error fetching properties:", error.message);
    } else {
      setProperties(data as Property[]);
    }
    setLoading(false);
  };

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  if (!properties.length)
    return <p className="text-center mt-10">No properties found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-brand-500">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={listing.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
              <p className="text-slate-600 mb-2">{listing.location}</p>
              <p className="text-brand-500 font-bold text-lg">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
