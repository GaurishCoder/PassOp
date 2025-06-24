import { useContext, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { PasswordContext } from "../store/PasswordContext";
import { UserContext } from "../store/UserContext";

function Table() {
  const { password, setPassword } = useContext(PasswordContext);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });

  const copyItem = (data) => {
    toast.success("Copied to your clipboard!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
      transition: Bounce,
    });
    navigator.clipboard.writeText(data);
  };

  const handleEditClick = async (entry) => {
    await axios.get("http://localhost:3000/password/edit", {
      params: { id: entry._id },
    });

    setEditingId(entry._id);
    setFormData({
      url: entry.url,
      username: entry.username,
      password: entry.password,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ url: "", username: "", password: "" });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/password/edit/${id}`,
        formData,
        { withCredentials: true }
      );
      const updatedEntry = res.data;
      const updatedUser = password.map((u) =>
        u._id === id ? updatedEntry : u
      );
      setPassword(updatedUser);
      toast.success("Password Updated!!");
      handleCancel();
    } catch (error) {
      toast.error("Failed to update");
      console.error(error);
    }
  };

  const handleDeleteBtn = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/password/delete/${id}`,
      { withCredentials: true }
    );
    let data = password.filter((e) => e._id !== id);
    setPassword(data);
    toast.success(res.data.message, {
      autoClose: 1000,
    });
  };

  return (
    <>
      <h1 className="font-bold text-xl my-3 w-full">Your Passwords</h1>
      <div className="overflow-x-auto w-full">
        {(password?.length || 0) === 0 ? (
          <h1 className="font-normal text-gray-600 text-lg">
            No Passwords Present
          </h1>
        ) : (
          <table className="table-auto min-w-full border">
            <thead>
              <tr className="border bg-green-700">
                <th className="text-white font-semibold text-center break-all px-2 py-1">
                  Website Url
                </th>
                <th className="text-white font-semibold text-center break-all px-2 py-1">
                  Username
                </th>
                <th className="text-white font-semibold text-center break-all px-2 py-1">
                  Password
                </th>
                <th className="text-white font-semibold text-center break-all px-2 py-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {password.map((entry, index) => (
                <tr key={index}>
                  {editingId === entry?._id ? (
                    <>
                      <td className="text-center break-all px-2 py-1">
                        <input
                          className="border rounded px-2 py-1 m-2 w-full"
                          value={formData.url}
                          onChange={(e) =>
                            setFormData({ ...formData, url: e.target.value })
                          }
                        />
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        <span
                          className="mx-1 cursor-pointer"
                          onClick={() => handleUpdate(entry._id)}
                        >
                          💾
                        </span>
                        <span
                          className="mx-1 cursor-pointer"
                          onClick={handleCancel}
                        >
                          ❌
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-center break-all px-2 py-1">
                        <a
                          target="_blank"
                          href={entry?.url}
                          rel="noreferrer"
                          className="break-all"
                        >
                          {entry?.url}
                        </a>
                        <i
                          className="ri-file-copy-2-line ml-2 cursor-pointer"
                          onClick={() => copyItem(entry?.url)}
                        ></i>
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        {entry?.username}
                        <i
                          className="ri-file-copy-2-line ml-2 cursor-pointer"
                          onClick={() => copyItem(entry?.username)}
                        ></i>
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        {entry?.password}
                        <i
                          className="ri-file-copy-2-line ml-2 cursor-pointer"
                          onClick={() => copyItem(entry?.password)}
                        ></i>
                      </td>
                      <td className="text-center break-all px-2 py-1">
                        <span
                          className="mx-1 cursor-pointer"
                          onClick={() => handleEditClick(entry)}
                        >
                          <i className="ri-edit-2-line"></i>
                        </span>
                        <span
                          className="mx-1 cursor-pointer"
                          onClick={() => handleDeleteBtn(entry?._id)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Table;
