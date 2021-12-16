const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf8");

let versionSum = 0;

function readPacket(buffer) {
  const version = readVersion(buffer);
  versionSum += version;
  const typeId = readTypeId(buffer);

  console.log({ version, typeId });

  if (typeId === 4) {
    return readLiteralValue(buffer);
  } else {
    return readOperator(buffer);
  }
}

function readOperator(buffer) {
  const lengthTypeId = buffer.splice(0, 1)[0];
  console.log("readOperator", { lengthTypeId });

  if (lengthTypeId === "0") {
    // next 15 bits are a number that represents the total length in bits
    // of the sub-packets contained by this packet.
    const lenSubpackets = parseInt(buffer.splice(0, 15).join(""), 2);
    console.log({ lenSubpackets });

    const expectedBufferLen = buffer.length - lenSubpackets;
    let c = 0;
    while (buffer.length > expectedBufferLen) {
      c++;
      console.log(`reading ${c} of ${lenSubpackets} subpackets`);
      readPacket(buffer);
    }
  } else {
    // next 11 bits are a number that represents the number of sub-packets
    // immediately contained by this packet.
    const numSubpackets = parseInt(buffer.splice(0, 11).join(""), 2);

    for (let i = 1; i <= numSubpackets; i++) {
      console.log(`reading ${i} of ${numSubpackets} subpackets`);
      readPacket(buffer);
    }
  }
}

function readLiteralValue(buffer) {
  let number = "";

  while (true) {
    const isLast = buffer.splice(0, 1)[0];
    const slice = buffer.splice(0, 4).join("");
    number += slice;
    if (isLast === "0") break;
  }

  const n = parseInt(number, 2);
  console.log("readLiteralValue", n);

  return n;
}

function readVersion(buffer) {
  const splice = buffer.splice(0, 3).join("");
  const version = parseInt(splice, 2);
  console.log("readVersion", { version });

  return version;
}

function readTypeId(buffer) {
  const splice = buffer.splice(0, 3).join("");
  const typeId = parseInt(splice, 2);
  console.log("readTypeId", { typeId });

  return typeId;
}

function hex2bin(hex){
  let bin = "";
  for (let i = 0; i < hex.length; i++) {
    bin += (parseInt(hex[i], 16).toString(2)).padStart(4, '0');
  }
  return bin;
}

const buffer = hex2bin(input).split("");
readPacket(buffer);

console.log({ answer: versionSum });