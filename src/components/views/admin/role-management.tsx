"use client";

import { useSupabaseClient } from "@/lib/hooks/context/use-supabase-context";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const RoleManagement = () => {
  const supabaseClient = useSupabaseClient();
  const [role, setRole] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [roleList, setRoleList] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from("roles")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setRoleList(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleAddRole = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await supabaseClient
        .from("roles")
        .insert({
          id: role,
          description: description,
        })
        .then(() => {
          fetchRoles();
          setRole("");
          setDescription("");
          setIsModalOpen(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await supabaseClient
        .from("roles")
        .delete()
        .eq("id", id)
        .then(() => fetchRoles());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <div className="flex w-full justify-end">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          Add Role
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center w-full items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roleList.map((role: any, index: number) => (
                <tr key={index}>
                  <td>{role.id}</td>
                  <td>{role.description}</td>
                  <td>
                    {role.id !== "admin" && (
                      <HiOutlineTrash
                        size={16}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleDeleteRole(role.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog
        open={isModalOpen}
        id="my_modal_1"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Role</h3>
          <div className="modal-action justify-center">
            <form method="dialog" onSubmit={handleAddRole}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center w-full justify-between gap-4">
                  <div>Name: </div>
                  <input
                    type="text"
                    className="input input-bordered input-ghost w-full max-w-[250px]"
                    placeholder="Enter New Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center w-full justify-between gap-4">
                  <div>Description: </div>
                  <input
                    type="text"
                    className="input input-bordered input-ghost w-full min-w-[250px]"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-end pt-4">
                <button className="btn btn-neutral">Add</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setRole("");
                    setDescription("");
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RoleManagement;
