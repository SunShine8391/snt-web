"use client";

import { PermissionItem } from "@/config/type";
import { useSupabaseClient } from "@/lib/hooks/context/use-supabase-context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";

const PermissionManagement = () => {
  const supabaseClient = useSupabaseClient();
  const [permission, setPermission] = useState<PermissionItem>();
  const [permissonList, setPermissionList] = useState<PermissionItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [route, setRoute] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("roles")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setPermissionList(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleUpdatePermission = async (id: string) => {
    setLoading(true);
    try {
      await supabaseClient
        .from("roles")
        .update({
          route: route,
        })
        .match({ id: id })
        .then(() => {
          fetchRoles();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
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
                <th>Route</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {permissonList.map((permission: any, index: number) => (
                <tr key={index}>
                  <td>{permission.id}</td>
                  <td>
                    {permission.id === "admin" ? (
                      "All Access"
                    ) : (
                      <Link href={permission.route}>{permission.route}</Link>
                    )}
                  </td>
                  <td>
                    {permission.id !== "admin" && (
                      <TbEdit
                        size={16}
                        color="grow"
                        className="cursor-pointer"
                        onClick={() => {
                          setPermission(permission);
                          setIsModalOpen(true);
                        }}
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
          <h3 className="font-bold text-lg">Edit Permission</h3>
          <div className="modal-action justify-center">
            <form
              method="dialog"
              onSubmit={() => handleUpdatePermission(permission?.id ?? "")}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center w-full justify-between gap-4">
                  <div>Route: </div>
                  <input
                    type="text"
                    className="input input-bordered input-ghost w-full min-w-72"
                    placeholder="Enter New Route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-end pt-8">
                <button className="btn btn-neutral">Update</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setRoute("");
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

export default PermissionManagement;
