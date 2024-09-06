import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionManagement from "@/components/views/admin/permission-management";
import RoleManagement from "@/components/views/admin/role-management";
import UserManagement from "@/components/views/admin/user-management";

const AdminPage = () => {
  return (
    <div className="px-5 pt-20" style={{ height: "calc(100vh - 60px)" }}>
      <Tabs defaultValue="role_management" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="role_management">Role Management</TabsTrigger>
          <TabsTrigger value="permission_management">
            Permission Management
          </TabsTrigger>
          <TabsTrigger value="user_management">User Management</TabsTrigger>
        </TabsList>
        <TabsContent value="role_management">
          <RoleManagement />
        </TabsContent>
        <TabsContent value="permission_management">
          <PermissionManagement />
        </TabsContent>
        <TabsContent value="user_management">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
