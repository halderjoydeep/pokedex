"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Modal from "react-modal";
import BarChart from "./BarChart";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "black",
    color: "white",
  },
  overlay: { backgroundColor: "gray" },
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const modalRef = useRef(null);

  const downloadPdf = async () => {
    const inputData = modalRef.current;

    if (!inputData) return;

    try {
      const canvas = await html2canvas(inputData, {
        scale: 3,
        backgroundColor: "hsla(20 14.3% 4.1%)",
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${pokemon.name}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group flex cursor-pointer flex-col overflow-hidden">
            <div className="relative h-40 w-full group-hover:scale-110">
              {pokemon.sprites.front_default ||
              pokemon.sprites.other["official-artwork"].front_default ? (
                <Image
                  src={
                    pokemon.sprites.front_default ||
                    pokemon.sprites.other["official-artwork"].front_default
                  }
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
            <h3 className="font-code mt-auto bg-primary py-1 text-center text-lg font-semibold  capitalize tracking-wider text-primary-foreground">
              {pokemon.name}
            </h3>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" ref={modalRef}>
          <div className="flex flex-col items-center">
            <Image
              src={
                pokemon.sprites.front_default ||
                pokemon.sprites.other["official-artwork"].front_default
              }
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <h2 className="font-code mb-4 capitalize text-[#61dafb]">
              {pokemon.name}
            </h2>
            <table className="mb-4">
              <thead>
                <tr>
                  <th className="table-cell">Stat Name</th>
                  <th className="table-cell">Base Stat</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map((item) => (
                  <tr key={item.stat.name}>
                    <td className="table-cell">{item.stat.name}</td>
                    <td className="table-cell">{item.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <BarChart stats={pokemon.stats} />

            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={downloadPdf}
              data-html2canvas-ignore
            >
              <Download className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PokemonCard;
