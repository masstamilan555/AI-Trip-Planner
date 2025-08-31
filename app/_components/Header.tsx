import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuOptions = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];
function Header() {
  const { user } = useUser();
  const path = usePathname();
  return (
    <div className="flex items-center justify-between p-4 ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="Logo" width={70} height={70} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>

      {/* menu */}
      <div className="flex items-center gap-8">
        {menuOptions.map((menu, index) => (
          <Link href={menu.href} key={index}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      {/* Get started */}
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get started</Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-4">
          {path == "create-new-trip" ? (
            <Link href="/create-new-trip">
              <Button>Create Trip</Button>
            </Link>
          ) : (
            <Link href="/my-trips">
              <Button>My Trips</Button>
            </Link>
          )}
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Header;
