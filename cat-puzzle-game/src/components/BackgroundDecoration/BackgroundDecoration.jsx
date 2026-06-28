import { motion } from "framer-motion";

function BackgroundDecoration() {
  return (
    <>
      {/* Purple Blob */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-300 opacity-20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mint Blob */}
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-200 opacity-20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Yellow Blob */}
      <motion.div
        className="absolute top-1/2 right-20 w-48 h-48 rounded-full bg-yellow-200 opacity-20 blur-3xl"
        animate={{ x: [0, 20, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

export default BackgroundDecoration;