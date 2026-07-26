-- Update RLS policies for tours table
drop policy if exists "Allow public insert access" on public.tours;
create policy "Allow public insert access" on public.tours for insert with check (true);

drop policy if exists "Allow public update access" on public.tours;
create policy "Allow public update access" on public.tours for update using (true);

drop policy if exists "Allow public delete access" on public.tours;
create policy "Allow public delete access" on public.tours for delete using (true);


-- Update RLS policies for transport_rates table
drop policy if exists "Allow public insert access" on public.transport_rates;
create policy "Allow public insert access" on public.transport_rates for insert with check (true);

drop policy if exists "Allow public update access" on public.transport_rates;
create policy "Allow public update access" on public.transport_rates for update using (true);

drop policy if exists "Allow public delete access" on public.transport_rates;
create policy "Allow public delete access" on public.transport_rates for delete using (true);
