import Image from "next/image";
import { UserCircle2 } from "lucide-react";
import { CardRoot, CardBody, CardLink } from "./Card";
import { cn } from "@/lib/utils";

export interface DoctorCardData {
  /** Absolute or relative URL to the doctor's portrait */
  photo?: string;
  name: string;
  /** e.g. "Cardiologist" */
  specialty: string;
  /** e.g. "Cardiology Department" */
  department: string;
  /** Route to the doctor's profile page */
  href: string;
}

export interface DoctorCardProps {
  data: DoctorCardData;
  className?: string;
}

/**
 * DoctorCard — centered portrait, name, specialty badge, department, profile link.
 * Portrait uses a circular clip; falls back to a silhouette icon.
 */
export function DoctorCard({ data, className }: DoctorCardProps) {
  const validPhoto = data.photo && (data.photo.startsWith("/") || /^https?:\/\//i.test(data.photo))
    ? data.photo
    : null;

  return (
    <CardRoot className={cn("group items-center text-center pt-6", className)}>
      <CardBody className="items-center">
        {/* Portrait */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-primary/10 bg-primary-light shrink-0 my-2 transition-transform duration-300 group-hover:scale-105">
          {validPhoto ? (
            <Image
              src={validPhoto}
              alt={`Dr. ${data.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 144px, 176px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-light to-secondary-light">
              <UserCircle2 className="w-20 h-20 text-primary/40" strokeWidth={1.25} />
            </div>
          )}
        </div>

        {/* Specialty badge */}
        <span className="inline-block rounded-full bg-secondary-light px-3 py-0.5 text-caption font-semibold text-secondary uppercase tracking-wider">
          {data.specialty}
        </span>

        {/* Name */}
        <h3 className="text-h4 font-semibold text-text leading-tight">
          {data.name}
        </h3>

        {/* Department */}
        <p className="text-small text-text-muted">{data.department}</p>

        {/* CTA */}
        <CardLink href={data.href} label="View Profile" className="mt-auto justify-center" />
      </CardBody>
    </CardRoot>
  );
}
