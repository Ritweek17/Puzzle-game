import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function Pagination({

  page,

  setPage,

  totalPages,

}) {

  return (

    <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">

      <motion.button

        whileTap={{ scale: 0.95 }}

        disabled={page === 1}

        onClick={() => setPage(page - 1)}

        className="
          w-11
          h-11
          rounded-full
          bg-white
          shadow-lg
          disabled:opacity-40
          flex
          items-center
          justify-center
        "

      >

        <ChevronLeft size={20} />

      </motion.button>

      {Array.from({

        length: totalPages,

      }).map((_, index) => {

        const pageNumber = index + 1;

        const start =

          (pageNumber - 1) * 20 + 1;

        const end = Math.min(

          pageNumber * 20,

          pageNumber === totalPages

            ? start + 19

            : pageNumber * 20

        );

        return (

          <motion.button

            key={pageNumber}

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

            onClick={() =>

              setPage(pageNumber)

            }

            className={`

              px-4
              py-2
              rounded-xl
              font-semibold
              transition-all

              ${

                page === pageNumber

                  ? "bg-[#7C5CFF] text-white shadow-lg"

                  : "bg-white shadow"

              }

            `}

          >

            {start}-{end}

          </motion.button>

        );

      })}

      <motion.button

        whileTap={{ scale: 0.95 }}

        disabled={page === totalPages}

        onClick={() =>

          setPage(page + 1)

        }

        className="
          w-11
          h-11
          rounded-full
          bg-white
          shadow-lg
          disabled:opacity-40
          flex
          items-center
          justify-center
        "

      >

        <ChevronRight size={20} />

      </motion.button>

    </div>

  );

}

export default Pagination;