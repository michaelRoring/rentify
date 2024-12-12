import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostPotrait = ({id, title, content, date, category, image, slug}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <Image src={image} alt={title} width={600} height={400} priority/>
      <div className="font-[700] text-[22px] tracking-tight">{title}</div>
      <div className="text-[14px] text-slate-500">{category} | {moment(date).format('YYYY, DD MMMM')}</div>
      <div>{content.substr(0, 70)}...</div>
      <Link href={`/post/${slug}`} className="text-blue-500">Read more...</Link>
    </div>
  );
}

export default PostPotrait;
