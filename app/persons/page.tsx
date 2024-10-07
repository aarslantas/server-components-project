import {getAllPersons} from "@/lib/data";
import Link from "next/link";

export default async function Persons() {
   const persons = await getAllPersons()
    console.log('persons', persons)
    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {persons.map((person, index) => (
                    <tr key={index}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>{person.email}</td>
                        <td className="flex gap-4">
                            <Link href={`persons/${person.id}/edit`} className="text-yellow-400">Update1</Link>
                            <button className="text-red-400">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}